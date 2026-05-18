'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { categories } from '@/constants/categories';


type ImageEntry = {
    url: string
    title: string
    isCover: boolean
}

// 新增一筆圖片
const addImage = () => {
    setImages(prev => [...prev, {
        url: '',
        title: '',
        isCover: prev.length === 0  // 第一張預設封面
    }])
}

export default function AdminPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    // 圖組基本資料
    const [keyword, setKeyword] = useState('');
    const [zhuyin, setZhuyin] = useState('');
    const [categoryMain, setCategoryMain] = useState('');
    const [categorySub, setCategorySub] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);

    // 圖片列表
    const [images, setImages] = useState<ImageEntry[]>([]);

    // 驗證登入
    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (!data.session) {
                router.push('/admin/login');
            } else {
                setLoading(false);
            }
        });
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    // 選擇圖片
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newImages: ImageEntry[] = files.map((file, i) => ({
            file,
            title: '',
            preview: URL.createObjectURL(file),
            isCover: images.length === 0 && i === 0, // 第一張預設封面
        }));
        setImages(prev => [...prev, ...newImages]);
    };

    // 設定封面
    const setCover = (index: number) => {
        setImages(prev => prev.map((img, i) => ({ ...img, isCover: i === index })));
    };

    // 更新圖片標題
    const updateTitle = (index: number, title: string) => {
        setImages(prev => prev.map((img, i) => i === index ? { ...img, title } : img));
    };

    // 刪除圖片
    const removeImage = (index: number) => {
        setImages(prev => {
            const next = prev.filter((_, i) => i !== index);
            // 如果刪掉的是封面，把第一張設為封面
            if (prev[index].isCover && next.length > 0) {
                next[0].isCover = true;
            }
            return next;
        });
    };

    // 儲存
    const handleSubmit = async () => {
        if (!keyword || !categoryMain || images.length === 0) {
            alert('請填寫關鍵字、分類，並至少上傳一張圖片');
            return;
        }

        setSubmitting(true);

        try {
            // 1. 先建立圖組（cover_image_id 之後再更新）
            const { data: group, error: groupError } = await supabase
                .from('image_groups')
                .insert({
                    group_keyword: keyword,
                    group_keyword_zhuyin: zhuyin,
                    category_main: categoryMain,
                    category_sub: categorySub || null,
                    is_featured: false,  // 先固定 false
                    cover_image_id: null,
                })
                .select()
                .single();

            if (groupError) throw groupError;

            // 2. 上傳圖片 & 建立 images 資料
            let coverId: string | null = null;

            for (let i = 0; i < images.length; i++) {
                const img = images[i];
                const ext = img.file.name.split('.').pop();
                const path = `${group.id}/${Date.now()}_${i}.${ext}`;

                // 上傳到 Storage
                const { error: uploadError } = await supabase.storage
                    .from('meme-images')
                    .upload(path, img.file);

                if (uploadError) throw uploadError;

                // 取得公開 URL
                const { data: urlData } = supabase.storage
                    .from('meme-images')
                    .getPublicUrl(path);

                // 存入 images 表
                const { data: imageRow, error: imageError } = await supabase
                    .from('images')
                    .insert({
                        group_id: group.id,
                        title: img.title || `圖片 ${i + 1}`,
                        url: urlData.publicUrl,
                        order: i + 1,
                        is_cover: img.isCover,
                    })
                    .select()
                    .single();

                if (imageError) throw imageError;

                if (img.isCover) coverId = imageRow.id;
            }

            // 3. 更新 cover_image_id
            if (coverId) {
                await supabase
                    .from('image_groups')
                    .update({ cover_image_id: coverId })
                    .eq('id', group.id);
            }

            setSuccess(true);
            setKeyword('');
            setZhuyin('');
            setCategoryMain('');
            setCategorySub('');
            setIsFeatured(false);
            setImages([]);

        } catch (err) {
            console.error(err);
            alert('儲存失敗，請檢查 console');
        } finally {
            setSubmitting(false);
        }
    };

    const subCategories = categories.find(c => c.id === categoryMain)?.children || [];

    if (loading) return null;

   return (
  <div className="min-h-screen bg-[#FFF5F8]">
    <div className="max-w-4xl mx-auto p-8 space-y-8">

      {/* Header */}
      <div className="rounded-3xl bg-white border-2 border-[#FFD1E0] p-6 shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#8B3A62]">
            ⚙️ 後台管理
          </h1>
          <p className="text-[#C48AA3] mt-2">
            新增 UsaminJoke 梗圖內容
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="
            px-5 py-2 rounded-2xl
            border-2 border-[#FF9BC1]
            text-[#D85D93]
            hover:bg-[#FF6FA7]
            hover:text-white
            hover:border-[#FF6FA7]
            transition-all
          "
        >
          登出
        </button>
      </div>

      {success ? (
        <div className="rounded-3xl bg-white border-2 border-[#FFD1E0] shadow-md p-10 text-center space-y-5">
          <div className="text-5xl">🎉</div>

          <h2 className="text-2xl font-bold text-[#8B3A62]">
            新增成功！
          </h2>

          <p className="text-[#C48AA3]">
            梗圖已成功加入資料庫
          </p>

          <button
            onClick={resetForm}
            className="
              px-6 py-3 rounded-2xl
              bg-[#FF6FA7]
              text-white font-medium
              hover:bg-[#FF5B99]
              shadow-md
              transition-all
            "
          >
            繼續新增
          </button>
        </div>
      ) : (
        <div className="rounded-3xl bg-white border-2 border-[#FFD1E0] shadow-md p-8 space-y-6">

          <h2 className="text-2xl font-bold text-[#8B3A62]">
            🐰 新增梗圖組
          </h2>

          {/* 關鍵字 & 注音 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#C48AA3] mb-2 block">
                關鍵字 *
              </label>
              <input
                className="
                  w-full px-4 py-3 rounded-2xl
                  border-2 border-[#FFD1E0]
                  text-[#8B3A62]
                  focus:outline-none
                  focus:border-[#FF9BC1]
                  focus:ring-4 focus:ring-[#FFE9F1]
                "
                placeholder="例：蟹"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-[#C48AA3] mb-2 block">
                注音
              </label>
              <input
                className="
                  w-full px-4 py-3 rounded-2xl
                  border-2 border-[#FFD1E0]
                  text-[#8B3A62]
                  focus:outline-none
                  focus:border-[#FF9BC1]
                  focus:ring-4 focus:ring-[#FFE9F1]
                "
                placeholder="例：ㄒㄧㄝˋ"
                value={zhuyin}
                onChange={(e) => setZhuyin(e.target.value)}
              />
            </div>
          </div>

          {/* 分類 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#C48AA3] mb-2 block">
                主要分類 *
              </label>
              <select
                className="
                  w-full px-4 py-3 rounded-2xl
                  border-2 border-[#FFD1E0]
                  text-[#8B3A62]
                  focus:outline-none
                "
                value={categoryMain}
                onChange={(e) => {
                  setCategoryMain(e.target.value);
                  setCategorySub('');
                }}
              >
                <option value="">選擇分類</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-[#C48AA3] mb-2 block">
                子分類
              </label>
              <select
                className="
                  w-full px-4 py-3 rounded-2xl
                  border-2 border-[#FFD1E0]
                  text-[#8B3A62]
                "
                value={categorySub}
                onChange={(e) => setCategorySub(e.target.value)}
                disabled={subCategories.length === 0}
              >
                <option value="">選擇子分類</option>
                {subCategories.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 圖片列表 */}
          <div>
            <label className="text-sm text-[#C48AA3] mb-3 block">
              圖片 *
            </label>

            <div className="space-y-4">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`
                    p-4 rounded-3xl border-2 transition-all
                    ${
                      img.isCover
                        ? 'border-[#FF6FA7] bg-[#FFF0F6]'
                        : 'border-[#FFD1E0] bg-white'
                    }
                  `}
                >
                  <div className="flex gap-4">
                    {img.url && (
                      <img
                        src={img.url}
                        className="w-20 h-20 object-cover rounded-2xl"
                        onError={(e) =>
                          (e.currentTarget.style.display = 'none')
                        }
                      />
                    )}

                    <div className="flex-1 space-y-2">
                      <input
                        className="w-full px-4 py-2 rounded-2xl border-2 border-[#FFD1E0]"
                        placeholder="圖片網址"
                        value={img.url}
                        onChange={(e) => updateUrl(i, e.target.value)}
                      />

                      <input
                        className="w-full px-4 py-2 rounded-2xl border-2 border-[#FFD1E0]"
                        placeholder="圖片標題"
                        value={img.title}
                        onChange={(e) => updateTitle(i, e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => setCover(i)}
                      className={`
                        px-4 py-2 rounded-2xl text-sm transition-all
                        ${
                          img.isCover
                            ? 'bg-[#FF6FA7] text-white'
                            : 'border-2 border-[#FF9BC1] text-[#D85D93]'
                        }
                      `}
                    >
                      {img.isCover ? '✓ 封面' : '設為封面'}
                    </button>

                    <button
                      onClick={() => removeImage(i)}
                      className="
                        px-4 py-2 rounded-2xl
                        border-2 border-red-300
                        text-red-500
                        hover:bg-red-400 hover:text-white
                        transition-all
                      "
                    >
                      刪除
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={addImage}
                className="
                  w-full py-3 rounded-2xl
                  border-2 border-dashed border-[#FF9BC1]
                  text-[#D85D93]
                  hover:bg-[#FFE9F1]
                  transition-all
                "
              >
                ＋ 新增圖片
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="
              w-full py-4 rounded-2xl
              bg-[#FF6FA7]
              text-white font-semibold
              hover:bg-[#FF5B99]
              shadow-md hover:shadow-lg
              transition-all
              disabled:opacity-50
            "
          >
            {submitting ? '儲存中...' : '新增圖組'}
          </button>
        </div>
      )}
    </div>
  </div>
);
}