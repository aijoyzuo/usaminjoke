'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import AdminAddGroup from './components/AdminAddGroup';
import AdminGroups from './components/AdminGroups';
import AdminCategories from './components/AdminCategories';

type Tab = 'add' | 'groups' | 'categories';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('add');

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

  if (loading) return null;

  const tabs: { id: Tab; label: string }[] = [
    { id: 'add', label: '🐰 新增圖組' },
    { id: 'groups', label: '📦 管理圖組' },
    { id: 'categories', label: '🗂️ 管理分類' },
  ];

  return (
    <div className="min-h-screen bg-[#FFF5F8]">
      <div className="max-w-4xl mx-auto p-8 space-y-6">

        {/* Header */}
        <div className="rounded-3xl bg-white border-2 border-[#FFD1E0] p-6 shadow-md flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#8B3A62]">⚙️ 後台管理</h1>
            <p className="text-[#C48AA3] mt-1">新增 UsaminJoke 梗圖內容</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-2xl border-2 border-[#FF9BC1] text-[#D85D93] hover:bg-[#FF6FA7] hover:text-white hover:border-[#FF6FA7] transition-all"
          >
            登出
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`
                px-5 py-2.5 rounded-2xl text-sm font-medium transition-all
                ${tab === t.id
                  ? 'bg-[#FF6FA7] text-white shadow-md'
                  : 'bg-white border-2 border-[#FFD1E0] text-[#D85D93] hover:bg-[#FFE9F1]'
                }
              `}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === 'add' && <AdminAddGroup />}
        {tab === 'groups' && <AdminGroups />}
        {tab === 'categories' && <AdminCategories />}

      </div>
    </div>
  );
}