import XLSX from 'xlsx';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import ws from 'ws';
import { parseTags } from '../utils/parseTags';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { realtime: { transport: ws as any } }
);


async function main() {
    // 讀取 Excel
    const wb = XLSX.readFile('./scripts/memes.xlsx');
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows: any[] = XLSX.utils.sheet_to_json(ws);

    // 拉所有分類
    const { data: cats } = await supabase.from('categories').select('*');
    const mainCatMap = new Map<string, string>(); // 主分類名稱 → uuid
    const subCatMap = new Map<string, string>(); // `${主分類uuid}::子分類名稱` → uuid
    cats?.forEach(c => {
        if (c.parent_id === null) {
            mainCatMap.set(c.name, c.id);
        } else {
            subCatMap.set(`${c.parent_id}::${c.name}`, c.id);
        }
    });

    // 把多行合併成圖組
    const groupMap = new Map<string, any>();
    rows.forEach(row => {
        const key = row.group_keyword;
        if (!groupMap.has(key)) {
            groupMap.set(key, {
                group_keyword: row.group_keyword,
                group_keyword_zhuyin: row.group_keyword_zhuyin ?? '',
                category_main: row.category_main ?? '',
                category_sub: row.category_sub ?? '',
                images: [],
            });
        }
        groupMap.get(key).images.push({
            title: row.image_title ?? '',
            url: row.image_url ?? '',
            is_cover: String(row.is_cover).toUpperCase() === 'TRUE',
            tags: parseTags(row.tags),
        });
    });

    const groups = Array.from(groupMap.values());
    console.log(`準備匯入 ${groups.length} 個圖組...`);

    for (const group of groups) {
        // 自動建立或取得主分類
        let mainId = mainCatMap.get(group.category_main);

        if (!mainId) {
            const { data: newMain, error } = await supabase
                .from('categories')
                .insert({
                    name: group.category_main,
                    parent_id: null,
                })
                .select()
                .single();

            if (error) {
                console.error(`主分類建立失敗：${group.category_main}`, error.message);
                continue;
            }

            mainId = newMain.id;
            mainCatMap.set(group.category_main, mainId!);
            console.log(`＋建立主分類：${group.category_main}`);
        }

        // 自動建立或取得子分類（同一子分類名稱在不同主分類下要分開建立）
        let subId: string | null = null;

        if (group.category_sub) {
            const subKey = `${mainId}::${group.category_sub}`;
            subId = subCatMap.get(subKey) ?? null;

            if (!subId) {
                const { data: newSub, error } = await supabase
                    .from('categories')
                    .insert({
                        name: group.category_sub,
                        parent_id: mainId,
                    })
                    .select()
                    .single();

                if (error) {
                    console.error(`子分類建立失敗：${group.category_sub}`, error.message);
                } else {
                    subId = newSub.id;
                    subCatMap.set(subKey, subId!);
                    console.log(`＋建立子分類：${group.category_sub}`);
                }
            }
        }

        // 建立圖組
        const { data: newGroup, error: groupError } = await supabase
            .from('image_groups')
            .insert({
                group_keyword: group.group_keyword,
                group_keyword_zhuyin: group.group_keyword_zhuyin || null,
                category_main: mainId,
                category_sub: subId ?? null,
                is_featured: false,
                cover_image_id: null,
            })
            .select()
            .single();

        if (groupError) {
            console.error(`「${group.group_keyword}」圖組建立失敗：`, groupError.message);
            continue;
        }

        // 新增圖片
        let coverId: string | null = null;
        for (let i = 0; i < group.images.length; i++) {
            const img = group.images[i];
            const { data: imageRow, error: imageError } = await supabase
                .from('images')
                .insert({
                    group_id: newGroup.id,
                    title: img.title,
                    url: img.url,
                    order: i + 1,
                    is_cover: img.is_cover,
                    tags: img.tags,
                })
                .select()
                .single();

            if (imageError) {
                console.error(`「${img.title}」圖片新增失敗：`, imageError.message);
                continue;
            }
            if (img.is_cover) coverId = imageRow.id;
        }

        // 更新封面
        if (coverId) {
            await supabase
                .from('image_groups')
                .update({ cover_image_id: coverId })
                .eq('id', newGroup.id);
        }

        console.log(`✓ ${group.group_keyword} (${group.images.length} 張)`);
    }

    console.log('匯入完成！');
}

main().catch(console.error);