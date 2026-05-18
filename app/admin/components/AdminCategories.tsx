'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Category = {
  id: string;
  name: string;
  parent_id: string | null;
};

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [newMainName, setNewMainName] = useState('');
  const [newSubName, setNewSubName] = useState('');
  const [addingSubFor, setAddingSubFor] = useState<string | null>(null);

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').order('created_at');
    if (data) setCategories(data);
  };

  useEffect(() => { fetchCategories(); }, []);

  const addMain = async () => {
    if (!newMainName.trim()) return;
    await supabase.from('categories').insert({ name: newMainName.trim(), parent_id: null });
    setNewMainName(''); fetchCategories();
  };

  const addSub = async (parentId: string) => {
    if (!newSubName.trim()) return;
    await supabase.from('categories').insert({ name: newSubName.trim(), parent_id: parentId });
    setNewSubName(''); setAddingSubFor(null); fetchCategories();
  };

  const saveEdit = async (id: string) => {
    await supabase.from('categories').update({ name: editName }).eq('id', id);
    setEditingId(null); fetchCategories();
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('確定要刪除？子分類也會一起刪除。')) return;
    await supabase.from('categories').delete().eq('id', id);
    fetchCategories();
  };

  const mainCategories = categories.filter(c => c.parent_id === null);

  return (
    <div className="space-y-4">
      {mainCategories.map(main => {
        const subs = categories.filter(c => c.parent_id === main.id);
        return (
          <div key={main.id} className="rounded-3xl bg-white border-2 border-[#FFD1E0] p-5 space-y-3">

            {/* 大分類 */}
            <div className="flex justify-between items-center">
              {editingId === main.id ? (
                <div className="flex gap-2 flex-1">
                  <input className="flex-1 px-3 py-2 rounded-xl border-2 border-[#FFD1E0] text-[#8B3A62]" value={editName} onChange={e => setEditName(e.target.value)} />
                  <button onClick={() => saveEdit(main.id)} className="px-3 py-2 rounded-xl bg-[#FF6FA7] text-white text-sm">儲存</button>
                  <button onClick={() => setEditingId(null)} className="px-3 py-2 rounded-xl border-2 border-[#FFD1E0] text-[#C48AA3] text-sm">取消</button>
                </div>
              ) : (
                <>
                  <p className="font-bold text-[#8B3A62]">{main.name}</p>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingId(main.id); setEditName(main.name); }} className="px-3 py-1.5 rounded-xl border-2 border-[#FF9BC1] text-[#D85D93] text-sm hover:bg-[#FFE9F1] transition-all">編輯</button>
                    <button onClick={() => deleteCategory(main.id)} className="px-3 py-1.5 rounded-xl border-2 border-red-300 text-red-500 text-sm hover:bg-red-50 transition-all">刪除</button>
                  </div>
                </>
              )}
            </div>

            {/* 子分類 */}
            <div className="pl-4 space-y-2">
              {subs.map(sub => (
                <div key={sub.id} className="flex justify-between items-center">
                  {editingId === sub.id ? (
                    <div className="flex gap-2 flex-1">
                      <input className="flex-1 px-3 py-2 rounded-xl border-2 border-[#FFD1E0] text-[#8B3A62] text-sm" value={editName} onChange={e => setEditName(e.target.value)} />
                      <button onClick={() => saveEdit(sub.id)} className="px-3 py-2 rounded-xl bg-[#FF6FA7] text-white text-sm">儲存</button>
                      <button onClick={() => setEditingId(null)} className="px-3 py-2 rounded-xl border-2 border-[#FFD1E0] text-[#C48AA3] text-sm">取消</button>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-[#8B3A62]">└ {sub.name}</p>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingId(sub.id); setEditName(sub.name); }} className="px-2 py-1 rounded-xl border-2 border-[#FF9BC1] text-[#D85D93] text-xs hover:bg-[#FFE9F1] transition-all">編輯</button>
                        <button onClick={() => deleteCategory(sub.id)} className="px-2 py-1 rounded-xl border-2 border-red-300 text-red-500 text-xs hover:bg-red-50 transition-all">刪除</button>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {/* 新增子分類 */}
              {addingSubFor === main.id ? (
                <div className="flex gap-2">
                  <input className="flex-1 px-3 py-2 rounded-xl border-2 border-[#FFD1E0] text-sm text-[#8B3A62]" placeholder="新子分類名稱" value={newSubName} onChange={e => setNewSubName(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSub(main.id)} />
                  <button onClick={() => addSub(main.id)} className="px-3 py-2 rounded-xl bg-[#FF6FA7] text-white text-sm">新增</button>
                  <button onClick={() => setAddingSubFor(null)} className="px-3 py-2 rounded-xl border-2 border-[#FFD1E0] text-sm text-[#C48AA3]">取消</button>
                </div>
              ) : (
                <button onClick={() => setAddingSubFor(main.id)} className="text-xs text-[#FF9BC1] hover:text-[#FF6FA7]">＋ 新增子分類</button>
              )}
            </div>
          </div>
        );
      })}

      {/* 新增大分類 */}
      <div className="rounded-3xl bg-white border-2 border-dashed border-[#FF9BC1] p-5">
        <p className="text-sm text-[#C48AA3] mb-2">新增大分類</p>
        <div className="flex gap-2">
          <input className="flex-1 px-4 py-2 rounded-2xl border-2 border-[#FFD1E0] text-[#8B3A62]" placeholder="分類名稱" value={newMainName} onChange={e => setNewMainName(e.target.value)} onKeyDown={e => e.key === 'Enter' && addMain()} />
          <button onClick={addMain} className="px-4 py-2 rounded-2xl bg-[#FF6FA7] text-white">新增</button>
        </div>
      </div>
    </div>
  );
}