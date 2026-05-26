'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import AdminAddGroup from './components/AdminAddGroup';
import AdminGroups from './components/AdminGroups';
import AdminCategories from './components/AdminCategories';
import { Settings, PlusCircle, Images, FolderTree } from "lucide-react";

type Tab = 'add' | 'groups' | 'categories';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('add');

  useEffect(() => {
  // 先檢查現有 session
  supabase.auth.getSession().then(({ data }) => {
    if (!data.session) {
      router.push('/admin/login');
    } else {
      setLoading(false);
    }
  });

  // 監聽登入/登出狀態變化
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT' || !session) {
      router.push('/admin/login');
    } else {
      setLoading(false);
    }
  });

  return () => subscription.unsubscribe();
}, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) return null;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'add',
      label: '新增圖組',
      icon: <PlusCircle size={18} />
    },
    {
      id: 'groups',
      label: '管理圖組',
      icon: <Images size={18} />
    },
    {
      id: 'categories',
      label: '管理分類',
      icon: <FolderTree size={18} />
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF5F8] bg-[radial-gradient(#FFD1E0_1.5px,transparent_1.5px)]
    bg-[size:28px_28px]">
      <div className="max-w-4xl mx-auto p-8 space-y-6">

        {/* Header */}
        <div className="rounded-3xl bg-white border-2 border-[#FFD1E0] p-6 shadow-md flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#8B3A62] flex items-center gap-1"><Settings size={28} />後台管理</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-2xl border-2 border-[#FF9BC1] text-[#D85D93] hover:bg-[#FF6FA7] hover:text-white hover:border-[#FF6FA7] transition-all cursor-pointer"
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
              flex items-center gap-2
              px-5 py-2.5 rounded-2xl text-sm font-medium transition-all cursor-pointer
              ${tab === t.id
                  ? 'bg-[#FF6FA7] text-white shadow-md'
                  : 'bg-white border-2 border-[#FFD1E0] text-[#D85D93] hover:bg-[#FFE9F1]'
                }
  `}
            >
              {t.icon}
              <span>{t.label}</span>
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