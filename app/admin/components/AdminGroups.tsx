'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Group = {
  id: string;
  group_keyword: string;
  group_keyword_zhuyin: string;
  category_main: string;
  category_sub: string | null;
  created_at: string;
  images?: { id: string; title: string; url: string; order: number; is_cover: boolean }[];
};

type Category = {
  id: string;
  name: string;
  parent_id: string | null;
};

export default function AdminGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // 編輯中的欄位
  const [editKeyword, setEditKeyword] = useState('');
  const [editZhuyin, setEditZhuyin] = useState('');
  const [editCategoryMain, setEditCategoryMain] = useState('');
  const [editCategorySub, setEditCategorySub] = useState('');

  const fetchGroups = async () => {
    const { data } = await supabase
      .from('image_groups')
      .select('*, images(*)')
      .order('created_at', { ascending: false });
    if (data) setGroups(data);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').order('created_at');
    if (data) setCategories(data);
  };

  useEffect(() => {
    fetchGroups();
    fetchCategories();
  }, []);

  const startEdit = (g: Group) => {
    setEditingId(g.id);
    setEditKeyword(g.group_keyword);
    setEditZhuyin(g.group_keyword_zhuyin);
    setEditCategoryMain(g.category_main);
    setEditCategorySub(g.category_sub ?? '');
  };

  const saveEdit = async (id: string) => {
    await supabase
      .from('image_groups')
      .update({
        group_keyword: editKeyword,
        group_keyword_zhuyin: editZhuyin,
        category_main: editCategoryMain,
        category_sub: editCategorySub || null,
      })
      .eq('id', id);
    setEditingId(null);
    fetchGroups();
  };

  const deleteGroup = async (id: string) => {
    if (!confirm('確定要刪除這個圖組嗎？圖片也會一起刪除。')) return;
    await supabase.from('image_groups').delete().eq('id', id);
    fetchGroups();
  };

  const mainCategories = categories.filter(c => c.parent_id === null);
  const subCategories = categories.filter(c => c.parent_id === editCategoryMain);

  // 顯示用：把 uuid 轉回名稱
  const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name ?? id;

  if (loading) return <div className="text-center text-[#C48AA3] py-10">載入中...</div>;

  return (
    <div className="space-y-4">
      {groups.length === 0 && (
        <div className="text-center text-[#C48AA3] py-10">還沒有圖組</div>
      )}

      {groups.map(g => (
        <div key={g.id} className="rounded-3xl bg-white border-2 border-[#FFD1E0] p-5 space-y-3">

          {editingId === g.id ? (
            // 編輯模式
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#C48AA3] mb-1 block">關鍵字</label>
                  <input
                    className="w-full px-4 py-2 rounded-2xl border-2 border-[#FFD1E0] text-[#8B3A62] focus:outline-none focus:border-[#FF9BC1]"
                    value={editKeyword}
                    onChange={e => setEditKeyword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-[#C48AA3] mb-1 block">注音</label>
                  <input
                    className="w-full px-4 py-2 rounded-2xl border-2 border-[#FFD1E0] text-[#8B3A62] focus:outline-none focus:border-[#FF9BC1]"
                    value={editZhuyin}
                    onChange={e => setEditZhuyin(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#C48AA3] mb-1 block">主要分類</label>
                  <select
                    className="w-full px-4 py-2 rounded-2xl border-2 border-[#FFD1E0] text-[#8B3A62]"
                    value={editCategoryMain}
                    onChange={e => { setEditCategoryMain(e.target.value); setEditCategorySub(''); }}
                  >
                    <option value="">選擇分類</option>
                    {mainCategories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[#C48AA3] mb-1 block">子分類</label>
                  <select
                    className="w-full px-4 py-2 rounded-2xl border-2 border-[#FFD1E0] text-[#8B3A62]"
                    value={editCategorySub}
                    onChange={e => setEditCategorySub(e.target.value)}
                    disabled={!editCategoryMain || subCategories.length === 0}
                  >
                    <option value="">選擇子分類</option>
                    {subCategories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => saveEdit(g.id)}
                  className="px-4 py-2 rounded-2xl bg-[#FF6FA7] text-white text-sm hover:bg-[#FF5B99] transition-all"
                >
                  儲存
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="px-4 py-2 rounded-2xl border-2 border-[#FFD1E0] text-[#C48AA3] text-sm"
                >
                  取消
                </button>
              </div>
            </div>
          ) : (
            // 顯示模式
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-[#8B3A62] text-lg">{g.group_keyword}</p>
                <p className="text-sm text-[#C48AA3]">
                  {g.group_keyword_zhuyin}
                  {g.category_main && ` · ${getCategoryName(g.category_main)}`}
                  {g.category_sub && ` / ${getCategoryName(g.category_sub)}`}
                  {` · ${g.images?.length ?? 0} 張圖片`}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(g)}
                  className="px-3 py-1.5 rounded-xl border-2 border-[#FF9BC1] text-[#D85D93] text-sm hover:bg-[#FFE9F1] transition-all"
                >
                  編輯
                </button>
                <button
                  onClick={() => deleteGroup(g.id)}
                  className="px-3 py-1.5 rounded-xl border-2 border-red-300 text-red-500 text-sm hover:bg-red-50 transition-all"
                >
                  刪除
                </button>
              </div>
            </div>
          )}

          {/* 圖片預覽 */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {g.images?.sort((a, b) => a.order - b.order).map(img => (
              <div key={img.id} className="flex-shrink-0 text-center">
                <img
                  src={img.url}
                  className={`w-16 h-16 object-cover rounded-xl ${img.is_cover ? 'ring-2 ring-[#FF6FA7]' : ''}`}
                />
                <p className="text-xs text-[#C48AA3] mt-1 w-16 truncate">{img.title}</p>
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}