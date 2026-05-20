'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus } from 'lucide-react';

type ImageEntry = {
  url: string;
  title: string;
  isCover: boolean;
  tags: string;  // 用逗號分隔的字串，存檔時再轉陣列
};

type Category = {
  id: string;
  name: string;
  parent_id: string | null;
};

export default function AdminAddGroup() {
  const [keyword, setKeyword] = useState('');
  const [zhuyin, setZhuyin] = useState('');
  const [categoryMain, setCategoryMain] = useState('');
  const [categorySub, setCategorySub] = useState('');
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [showAddMain, setShowAddMain] = useState(false);
  const [showAddSub, setShowAddSub] = useState(false);
  const [newMainName, setNewMainName] = useState('');
  const [newSubName, setNewSubName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').order('created_at');
    if (data) setAllCategories(data);
  };

  useEffect(() => { fetchCategories(); }, []);

  const addMainCategory = async () => {
    if (!newMainName.trim()) return;
    await supabase.from('categories').insert({ name: newMainName.trim(), parent_id: null });
    setNewMainName(''); setShowAddMain(false); fetchCategories();
  };

  const addSubCategory = async () => {
    if (!newSubName.trim() || !categoryMain) return;
    await supabase.from('categories').insert({ name: newSubName.trim(), parent_id: categoryMain });
    setNewSubName(''); setShowAddSub(false); fetchCategories();
  };

  const addImage = () => setImages(prev => [...prev, { url: '', title: '', isCover: prev.length === 0, tags: '' }]);
  const updateUrl = (i: number, url: string) => setImages(prev => prev.map((img, idx) => idx === i ? { ...img, url } : img));
  const updateTitle = (i: number, title: string) => setImages(prev => prev.map((img, idx) => idx === i ? { ...img, title } : img));
  const updateTags = (i: number, tags: string) =>
    setImages(prev => prev.map((img, idx) => idx === i ? { ...img, tags } : img));
  const setCover = (i: number) => setImages(prev => prev.map((img, idx) => ({ ...img, isCover: idx === i })));
  const removeImage = (i: number) => {
    setImages(prev => {
      const next = prev.filter((_, idx) => idx !== i);
      if (prev[i].isCover && next.length > 0) next[0].isCover = true;
      return next;
    });
  };

  const resetForm = () => {
    setKeyword(''); setZhuyin(''); setCategoryMain('');
    setCategorySub(''); setImages([]); setSuccess(false);
  };

  const handleSubmit = async () => {
    if (!keyword || !categoryMain || images.length === 0) {
      alert('請填寫關鍵字、分類，並至少新增一張圖片'); return;
    }
    if (images.some(img => !img.url.trim())) {
      alert('請填寫所有圖片的網址'); return;
    }
    setSubmitting(true);
    try {
      const { data: group, error: groupError } = await supabase
        .from('image_groups')
        .insert({ group_keyword: keyword, group_keyword_zhuyin: zhuyin || null, category_main: categoryMain, category_sub: categorySub || null, is_featured: false, cover_image_id: null })
        .select().single();
      if (groupError) throw groupError;

      let coverId: string | null = null;
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const { data: imageRow, error: imageError } = await supabase
          .from('images')
          .insert({ group_id: group.id, title: img.title || `圖片 ${i + 1}`, url: img.url.trim(), order: i + 1, is_cover: img.isCover,tags: img.tags ? img.tags.split(',').map(t => t.trim()).filter(Boolean)
      : [], })
          .select().single();
        if (imageError) throw imageError;
        if (img.isCover) coverId = imageRow.id;
      }
      if (coverId) {
        await supabase.from('image_groups').update({ cover_image_id: coverId }).eq('id', group.id);
      }
      setSuccess(true);
    } catch (err) {
      console.error(err); alert('儲存失敗，請檢查 console');
    } finally {
      setSubmitting(false);
    }
  };

  const mainCategories = allCategories.filter(c => c.parent_id === null);
  const subCategories = allCategories.filter(c => c.parent_id === categoryMain);

  if (success) return (
    <div className="rounded-3xl bg-white border-2 border-[#FFD1E0] shadow-md p-10 text-center space-y-5">
      <div className="text-5xl">🎉</div>
      <h2 className="text-2xl font-bold text-[#8B3A62]">新增成功！</h2>
      <button onClick={resetForm} className="px-6 py-3 rounded-2xl bg-[#FF6FA7] text-white font-medium hover:bg-[#FF5B99] transition-all">
        繼續新增
      </button>
    </div>
  );

  return (
    <div className="rounded-3xl bg-white border-2 border-[#FFD1E0] shadow-md p-8 space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-[#C48AA3] mb-2 block">關鍵字 *</label>
          <input className="w-full px-4 py-3 rounded-2xl border-2 border-[#FFD1E0] text-[#8B3A62] focus:outline-none focus:border-[#FF9BC1]" placeholder="例：蟹" value={keyword} onChange={e => setKeyword(e.target.value)} />
        </div>
        <div>
          <label className="text-sm text-[#C48AA3] mb-2 block">注音</label>
          <input className="w-full px-4 py-3 rounded-2xl border-2 border-[#FFD1E0] text-[#8B3A62] focus:outline-none focus:border-[#FF9BC1]" placeholder="例：ㄒㄧㄝˋ" value={zhuyin} onChange={e => setZhuyin(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-[#C48AA3] block">主要分類 *</label>
          <select className="w-full px-4 py-3 rounded-2xl border-2 border-[#FFD1E0] text-[#8B3A62]" value={categoryMain} onChange={e => { setCategoryMain(e.target.value); setCategorySub(''); }}>
            <option value="">選擇分類</option>
            {mainCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          {showAddMain ? (
            <div className="flex gap-2">
              <input className="flex-1 px-3 py-2 rounded-xl border-2 border-[#FFD1E0] text-sm text-[#8B3A62]" placeholder="新分類名稱" value={newMainName} onChange={e => setNewMainName(e.target.value)} onKeyDown={e => e.key === 'Enter' && addMainCategory()} />
              <button onClick={addMainCategory} className="px-3 py-2 rounded-xl bg-[#FF6FA7] text-white text-sm cursor-pointer">新增</button>
              <button onClick={() => setShowAddMain(false)} className="px-3 py-2 rounded-xl border-2 border-[#FFD1E0] text-sm text-[#C48AA3] cursor-pointer">取消</button>
            </div>
          ) : (
            <button onClick={() => setShowAddMain(true)} className="text-sm text-[#FF9BC1] hover:text-[#FF6FA7] cursor-pointer">＋ 新增大分類</button>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm text-[#C48AA3] block">子分類</label>
          <select className="w-full px-4 py-3 rounded-2xl border-2 border-[#FFD1E0] text-[#8B3A62]" value={categorySub} onChange={e => setCategorySub(e.target.value)} disabled={!categoryMain}>
            <option value="">選擇子分類</option>
            {subCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          {categoryMain && (showAddSub ? (
            <div className="flex gap-2">
              <input className="flex-1 px-3 py-2 rounded-xl border-2 border-[#FFD1E0] text-sm text-[#8B3A62]" placeholder="新子分類名稱" value={newSubName} onChange={e => setNewSubName(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSubCategory()} />
              <button onClick={addSubCategory} className="px-3 py-2 rounded-xl bg-[#FF6FA7] text-white text-sm">新增</button>
              <button onClick={() => setShowAddSub(false)} className="px-3 py-2 rounded-xl border-2 border-[#FFD1E0] text-sm text-[#C48AA3]">取消</button>
            </div>
          ) : (
            <button onClick={() => setShowAddSub(true)} className="text-sm text-[#FF9BC1] hover:text-[#FF6FA7] cursor-pointer">＋ 新增子分類</button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm text-[#C48AA3] mb-3 block">圖片 *</label>
        <div className="space-y-4">
          {images.map((img, i) => (
            <div key={i} className={`p-4 rounded-3xl border-2 transition-all ${img.isCover ? 'border-[#FF6FA7] bg-[#FFF0F6]' : 'border-[#FFD1E0]'}`}>
              <div className="flex gap-4">
                {img.url && <img src={img.url} className="w-20 h-20 object-cover rounded-2xl flex-shrink-0" onError={e => (e.currentTarget.style.display = 'none')} />}
                <div className="flex-1 space-y-2">
                  <input className="w-full px-4 py-2 rounded-2xl border-2 border-[#FFD1E0] text-[#8B3A62] focus:outline-none focus:border-[#FF9BC1]" placeholder="圖片網址" value={img.url} onChange={e => updateUrl(i, e.target.value)} />
                  <input className="w-full px-4 py-2 rounded-2xl border-2 border-[#FFD1E0] text-[#8B3A62] focus:outline-none focus:border-[#FF9BC1]" placeholder="圖片標題" value={img.title} onChange={e => updateTitle(i, e.target.value)} />
                  <input
                    className="w-full px-4 py-2 rounded-2xl border-2 border-[#FFD1E0] text-[#8B3A62] focus:outline-none focus:border-[#FF9BC1]"
                    placeholder="標籤（用逗號分隔，例：社畜,開心）"
                    value={img.tags}
                    onChange={(e) => updateTags(i, e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-3">
                <button onClick={() => setCover(i)} className={`px-4 py-2 rounded-2xl text-sm transition-all cursor-pointer ${img.isCover ? 'bg-[#FF6FA7] text-white' : 'border-2 border-[#FF9BC1] text-[#D85D93]'}`}>
                  {img.isCover ? '✓ 封面' : '設為封面'}
                </button>
                <button onClick={() => removeImage(i)} className="px-4 py-2 rounded-2xl border-2 border-red-300 text-red-500 hover:bg-red-400 hover:text-white transition-all cursor-pointer">刪除</button>
              </div>
            </div>
          ))}
          <button onClick={addImage} className="w-full py-3 rounded-2xl border-2 border-dashed border-[#FF9BC1] text-[#D85D93] hover:bg-[#FFE9F1] transition-all flex items-center justify-center gap-2 cursor-pointer"> <Plus size={16} /> 新增圖片</button>

        </div>
      </div>

      <button onClick={handleSubmit} disabled={submitting} className="w-full py-4 rounded-2xl bg-[#FF6FA7] text-white font-semibold hover:bg-[#FF5B99] shadow-md transition-all disabled:opacity-50 cursor-pointer">
        {submitting ? '儲存中...' : '新增圖組'}
      </button>
    </div>
  );
}