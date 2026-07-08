'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';
import { parseTags } from '@/utils/parseTags';
import { ChevronLeft, ChevronRight, Plus, Save, X } from 'lucide-react';

type Image = {
  id: string;
  title: string;
  url: string;
  order: number;
  is_cover: boolean;
  tags: string[];
};

type Group = {
  id: string;
  group_keyword: string;
  group_keyword_zhuyin: string;
  category_main: string;
  category_sub: string | null;
  created_at: string;
  images?: Image[];
};

type Category = {
  id: string;
  name: string;
  parent_id: string | null;
};

const PAGE_SIZE = 20;

export default function AdminGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editKeyword, setEditKeyword] = useState('');
  const [editZhuyin, setEditZhuyin] = useState('');
  const [editCategoryMain, setEditCategoryMain] = useState('');
  const [editCategorySub, setEditCategorySub] = useState('');
  const [editImages, setEditImages] = useState<Image[]>([]);
  const [editImageTags, setEditImageTags] = useState<Record<string, string>>({});
  const [newImages, setNewImages] = useState<{
    url: string;
    title: string;
    is_cover: boolean;
    tags: string;
  }[]>([]);

  const fetchGroups = (p = 0) => {
    const from = p * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    return supabase
      .from('image_groups')
      .select('*, images(*)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)
      .then(({ data, count }) => {
        if (data) setGroups(data);
        if (count !== null) setTotal(count);
        setLoading(false);
      });
  };

  const fetchCategories = () => {
    return supabase.from('categories').select('*').order('created_at').then(({ data }) => {
      if (data) setCategories(data);
    });
  };

  useEffect(() => {
    fetchGroups(page);
    fetchCategories();
  }, [page]);

  const startEdit = (g: Group) => {
    setEditingId(g.id);
    setEditKeyword(g.group_keyword);
    setEditZhuyin(g.group_keyword_zhuyin ?? '');
    setEditCategoryMain(g.category_main);
    setEditCategorySub(g.category_sub ?? '');
    setEditImages(g.images?.sort((a, b) => a.order - b.order) ?? []);
    setNewImages([]);

    // 初始化 tags 暫存字串
    const tagsMap: Record<string, string> = {};
    g.images?.forEach(img => {
      tagsMap[img.id] = img.tags?.join(', ') ?? '';
    });
    setEditImageTags(tagsMap);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewImages([]);
    setEditImageTags({});
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

    for (const img of editImages) {
      await supabase
        .from('images')
        .update({
          title: img.title,
          url: img.url,
          is_cover: img.is_cover,
          tags: parseTags(editImageTags[img.id]),
        })
        .eq('id', img.id);
    }

    let coverId: string | null = editImages.find(img => img.is_cover)?.id ?? null;

    if (newImages.length > 0) {
      const maxOrder = Math.max(...editImages.map(i => i.order), 0);
      for (let i = 0; i < newImages.length; i++) {
        const img = newImages[i];
        const { data: imageRow } = await supabase.from('images').insert({
          group_id: id,
          title: img.title || `圖片 ${maxOrder + i + 1}`,
          url: img.url,
          order: maxOrder + i + 1,
          is_cover: img.is_cover,
          tags: parseTags(img.tags),
        }).select().single();
        if (img.is_cover && imageRow) {
          coverId = imageRow.id;
        }
      }
    }

    if (coverId) {
      await supabase.from('image_groups').update({ cover_image_id: coverId }).eq('id', id);
    }

    setEditingId(null);
    setNewImages([]);
    setEditImageTags({});
    fetchGroups(page);
  };

  const deleteGroup = async (id: string) => {
    if (!confirm('確定要刪除這個圖組嗎？')) return;
    await supabase.from('image_groups').delete().eq('id', id);
    fetchGroups(page);
  };

  const deleteImage = async (imgId: string) => {
    if (!confirm('確定要刪除這張圖片嗎？')) return;
    await supabase.from('images').delete().eq('id', imgId);
    setEditImages(prev => prev.filter(i => i.id !== imgId));
    setEditImageTags(prev => {
      const next = { ...prev };
      delete next[imgId];
      return next;
    });
  };

  const setCover = (imgId: string, isNew = false) => {
    if (!isNew) {
      setEditImages(prev => prev.map(i => ({ ...i, is_cover: i.id === imgId })));
      setNewImages(prev => prev.map(i => ({ ...i, is_cover: false })));
    } else {
      setEditImages(prev => prev.map(i => ({ ...i, is_cover: false })));
      setNewImages(prev => prev.map((i, idx) => ({ ...i, is_cover: idx === parseInt(imgId) })));
    }
  };

  const addNewImage = () => {
    setNewImages(prev => [...prev, { url: '', title: '', is_cover: false, tags: '' }]);
  };

  const updateNewImage = (index: number, field: 'url' | 'title' | 'tags', value: string) => {
    setNewImages(prev => prev.map((img, i) =>
      i === index ? { ...img, [field]: value } : img
    ));
  };

  const removeNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  const mainCategories = categories.filter(c => c.parent_id === null);
  const subCategories = categories.filter(c => c.parent_id === editCategoryMain);
  const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name ?? id;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (loading) return <div className="text-center text-[#C48AA3] py-10">載入中...</div>;

  return (
    <div className="space-y-4">

      <div className="flex justify-between items-center">
        <p className="text-sm text-[#C48AA3]">共 {total} 個圖組</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setLoading(true); setPage(p => Math.max(0, p - 1)); }}
            disabled={page === 0}
            className="p-2 rounded-xl border-2 border-[#FFD1E0] text-[#D85D93] disabled:opacity-30 hover:bg-[#FFE9F1] transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm text-[#8B3A62] font-medium">
            {page + 1} / {totalPages || 1}
          </span>
          <button
            onClick={() => { setLoading(true); setPage(p => Math.min(totalPages - 1, p + 1)); }}
            disabled={page >= totalPages - 1}
            className="p-2 rounded-xl border-2 border-[#FFD1E0] text-[#D85D93] disabled:opacity-30 hover:bg-[#FFE9F1] transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {groups.length === 0 && (
        <div className="text-center text-[#C48AA3] py-10">還沒有圖組</div>
      )}

      {groups.map(g => (
        <div key={g.id} className="rounded-3xl bg-white border-2 border-[#FFD1E0] p-5 space-y-4">

          {editingId === g.id ? (
            <div className="space-y-4">

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#C48AA3] mb-1 block">關鍵字</label>
                  <input className="w-full px-4 py-2 rounded-2xl border-2 border-[#FFD1E0] text-[#8B3A62] focus:outline-none focus:border-[#FF9BC1]" value={editKeyword} onChange={e => setEditKeyword(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs text-[#C48AA3] mb-1 block">注音</label>
                  <input className="w-full px-4 py-2 rounded-2xl border-2 border-[#FFD1E0] text-[#8B3A62] focus:outline-none focus:border-[#FF9BC1]" value={editZhuyin} onChange={e => setEditZhuyin(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#C48AA3] mb-1 block">主要分類</label>
                  <select className="w-full px-4 py-2 rounded-2xl border-2 border-[#FFD1E0] text-[#8B3A62]" value={editCategoryMain} onChange={e => { setEditCategoryMain(e.target.value); setEditCategorySub(''); }}>
                    <option value="">選擇分類</option>
                    {mainCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[#C48AA3] mb-1 block">子分類</label>
                  <select className="w-full px-4 py-2 rounded-2xl border-2 border-[#FFD1E0] text-[#8B3A62]" value={editCategorySub} onChange={e => setEditCategorySub(e.target.value)} disabled={!editCategoryMain || subCategories.length === 0}>
                    <option value="">選擇子分類</option>
                    {subCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              {/* 既有圖片 */}
              <div>
                <label className="text-xs text-[#C48AA3] mb-2 block">既有圖片</label>
                <div className="space-y-2">
                  {editImages.map(img => (
                    <div key={img.id} className={`p-3 rounded-2xl border-2 ${img.is_cover ? 'border-[#FF6FA7] bg-[#FFF0F6]' : 'border-[#FFD1E0]'}`}>
                      <div className="flex gap-3">
                        {img.url && (
                          // eslint-disable-next-line @next/next/no-img-element -- admin can edit to an arbitrary URL; next/image requires an allowlisted domain
                          <img
                            src={img.url}
                            alt=""
                            className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                            onError={e => (e.currentTarget.style.display = 'none')}
                          />
                        )}
                        <div className="flex-1 space-y-1.5">
                          <input
                            className="w-full px-3 py-1.5 rounded-xl border-2 border-[#FFD1E0] text-sm text-[#8B3A62] focus:outline-none focus:border-[#FF9BC1]"
                            placeholder="圖片網址"
                            value={img.url}
                            onChange={e => setEditImages(prev => prev.map(i => i.id === img.id ? { ...i, url: e.target.value } : i))}
                          />
                          <input
                            className="w-full px-3 py-1.5 rounded-xl border-2 border-[#FFD1E0] text-sm text-[#8B3A62] focus:outline-none focus:border-[#FF9BC1]"
                            placeholder="圖片標題"
                            value={img.title}
                            onChange={e => setEditImages(prev => prev.map(i => i.id === img.id ? { ...i, title: e.target.value } : i))}
                          />
                          <input
                            className="w-full px-3 py-1.5 rounded-xl border-2 border-[#FFD1E0] text-sm text-[#8B3A62] focus:outline-none focus:border-[#FF9BC1]"
                            placeholder="標籤（用逗號分隔，例：社畜,開心）"
                            value={editImageTags[img.id] ?? ''}
                            onChange={e => setEditImageTags(prev => ({ ...prev, [img.id]: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => setCover(img.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${img.is_cover ? 'bg-[#FF6FA7] text-white' : 'border-2 border-[#FF9BC1] text-[#D85D93]'}`}
                        >
                          {img.is_cover ? '✓ 封面' : '設為封面'}
                        </button>
                        <button
                          onClick={() => deleteImage(img.id)}
                          className="px-3 py-1.5 rounded-xl text-xs border-2 border-red-300 text-red-500 hover:bg-red-400 hover:text-white transition-all cursor-pointer"
                        >
                          刪除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 新增圖片 */}
              {newImages.length > 0 && (
                <div>
                  <label className="text-xs text-[#C48AA3] mb-2 block">新增圖片</label>
                  <div className="space-y-2">
                    {newImages.map((img, i) => (
                      <div key={i} className={`p-3 rounded-2xl border-2 ${img.is_cover ? 'border-[#FF6FA7] bg-[#FFF0F6]' : 'border-[#FFD1E0]'}`}>
                        <div className="flex gap-3">
                          {img.url && (
                            // eslint-disable-next-line @next/next/no-img-element -- admin can edit to an arbitrary URL; next/image requires an allowlisted domain
                            <img
                              src={img.url}
                              alt=""
                              className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                              onError={e => (e.currentTarget.style.display = 'none')}
                            />
                          )}
                          <div className="flex-1 space-y-1.5">
                            <input
                              className="w-full px-3 py-1.5 rounded-xl border-2 border-[#FFD1E0] text-sm text-[#8B3A62] focus:outline-none focus:border-[#FF9BC1]"
                              placeholder="圖片網址"
                              value={img.url}
                              onChange={e => updateNewImage(i, 'url', e.target.value)}
                            />
                            <input
                              className="w-full px-3 py-1.5 rounded-xl border-2 border-[#FFD1E0] text-sm text-[#8B3A62] focus:outline-none focus:border-[#FF9BC1]"
                              placeholder="圖片標題"
                              value={img.title}
                              onChange={e => updateNewImage(i, 'title', e.target.value)}
                            />
                            <input
                              className="w-full px-3 py-1.5 rounded-xl border-2 border-[#FFD1E0] text-sm text-[#8B3A62] focus:outline-none focus:border-[#FF9BC1]"
                              placeholder="標籤（用逗號分隔，例：社畜,開心）"
                              value={img.tags ?? ''}
                              onChange={e => updateNewImage(i, 'tags', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => setCover(String(i), true)}
                            className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${img.is_cover ? 'bg-[#FF6FA7] text-white' : 'border-2 border-[#FF9BC1] text-[#D85D93]'}`}
                          >
                            {img.is_cover ? '✓ 封面' : '設為封面'}
                          </button>
                          <button
                            onClick={() => removeNewImage(i)}
                            className="px-3 py-1.5 rounded-xl text-xs border-2 border-red-300 text-red-500 hover:bg-red-400 hover:text-white transition-all cursor-pointer"
                          >
                            刪除
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={addNewImage}
                className="w-full py-2.5 rounded-2xl border-2 border-dashed border-[#FF9BC1] text-[#D85D93] text-sm hover:bg-[#FFE9F1] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus size={16} /> 新增圖片
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => saveEdit(g.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FF6FA7] text-white text-sm hover:bg-[#FF5B99] transition-all cursor-pointer"
                >
                  <Save size={16} /> 儲存
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl border-2 border-[#FFD1E0] text-[#C48AA3] text-sm cursor-pointer"
                >
                  <X size={16} /> 取消
                </button>
              </div>
            </div>

          ) : (
            <>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-[#8B3A62] text-lg">{g.group_keyword}</p>
                  <p className="text-sm text-[#C48AA3]">
                    {g.group_keyword_zhuyin}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(g)} className="px-3 py-1.5 rounded-xl border-2 border-[#FF9BC1] text-[#D85D93] text-sm hover:bg-[#FFE9F1] transition-all cursor-pointer text-nowrap">編輯</button>
                  <button onClick={() => deleteGroup(g.id)} className="px-3 py-1.5 rounded-xl border-2 border-red-300 text-red-500 text-sm hover:bg-red-50 transition-all cursor-pointer text-nowrap">刪除</button>
                </div>
              </div>
              <p className="text-sm text-[#C48AA3]">
                {g.category_main && ` ${getCategoryName(g.category_main)}`}
                {g.category_sub && ` / ${getCategoryName(g.category_sub)}`}
                {` · ${g.images?.length ?? 0} 張圖片`}
              </p>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {g.images?.sort((a, b) => a.order - b.order).map(img => (
                  <div key={img.id} className="flex-shrink-0 text-center p-1">
                    <div className={`relative w-16 h-16 rounded-xl overflow-hidden ${img.is_cover ? 'ring-2 ring-[#FF6FA7]' : ''}`}>
                      <Image src={img.url} alt={img.title} fill sizes="64px" className="object-cover" />
                    </div>
                    <p className="text-xs text-[#C48AA3] mt-1 w-16 truncate">{img.title}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-2">
          <button onClick={() => { setLoading(true); setPage(p => Math.max(0, p - 1)); }} disabled={page === 0} className="p-2 rounded-xl border-2 border-[#FFD1E0] text-[#D85D93] disabled:opacity-30 hover:bg-[#FFE9F1] transition-all">
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => { setLoading(true); setPage(i); }} className={`w-8 h-8 rounded-xl text-sm font-medium transition-all ${page === i ? 'bg-[#FF6FA7] text-white' : 'border-2 border-[#FFD1E0] text-[#D85D93] hover:bg-[#FFE9F1]'}`}>
              {i + 1}
            </button>
          ))}
          <button onClick={() => { setLoading(true); setPage(p => Math.min(totalPages - 1, p + 1)); }} disabled={page >= totalPages - 1} className="p-2 rounded-xl border-2 border-[#FFD1E0] text-[#D85D93] disabled:opacity-30 hover:bg-[#FFE9F1] transition-all">
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}