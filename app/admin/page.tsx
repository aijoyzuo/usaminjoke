'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import AdminAddGroup from './components/AdminAddGroup';
import AdminManage from './components/AdminManage';
import { Settings, PlusCircle, FolderTree, BarChart3 } from "lucide-react";

type Tab = 'add' | 'manage';

export default function AdminPage() {
  const router = useRouter();
  const { isLoggedIn, loading } = useAuth();
  const [tab, setTab] = useState<Tab>('add');

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/admin/login');
    }
  }, [loading, isLoggedIn, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading || !isLoggedIn) return null;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'add',
      label: '新增圖組',
      icon: <PlusCircle size={18} />
    },
    {
      id: 'manage',
      label: '管理',
      icon: <FolderTree size={18} />
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF5F8] bg-[radial-gradient(#FFD1E0_1.5px,transparent_1.5px)]
    bg-[size:28px_28px]">
      <div className="max-w-6xl mx-auto p-8 space-y-6">

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
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium transition-all bg-white border-2 border-[#FFD1E0] text-[#D85D93] hover:bg-[#FFE9F1]"
          >
            <BarChart3 size={18} />
            <span>數據總覽</span>
          </Link>
        </div>

        {/* Content */}
        {tab === 'add' && <AdminAddGroup />}
        {tab === 'manage' && <AdminManage />}

      </div>
    </div>
  );
}