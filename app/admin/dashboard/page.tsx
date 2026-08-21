import Link from 'next/link';
import { ArrowLeft, BarChart3, Images, FolderTree, Tags, MessageCircle } from 'lucide-react';
import { getDashboardStats } from '@/lib/dashboard';
import DashboardCharts from './DashboardCharts';

function KpiCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white border-2 border-[#FFD1E0] p-5 shadow-md flex items-center gap-4">
      <div className="w-11 h-11 rounded-2xl bg-[#FFE9F1] text-[#FF6FA7] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-[#8B3A62]">{value.toLocaleString()}</p>
        <p className="text-xs text-[#C48AA3]">{label}</p>
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="min-h-screen bg-[#FFF5F8] bg-[radial-gradient(#FFD1E0_1.5px,transparent_1.5px)] bg-[size:28px_28px]">
      <div className="max-w-6xl mx-auto p-8 space-y-6">

        <div className="rounded-3xl bg-white border-2 border-[#FFD1E0] p-6 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h1 className="text-3xl font-bold text-[#8B3A62] flex items-center gap-2">
            <BarChart3 size={28} />數據總覽
          </h1>
          <Link
            href="/admin"
            className="px-5 py-2 rounded-2xl border-2 border-[#FF9BC1] text-[#D85D93] hover:bg-[#FF6FA7] hover:text-white hover:border-[#FF6FA7] transition-all flex items-center gap-1.5 text-nowrap"
          >
            <ArrowLeft size={16} />返回後台
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label="梗圖總數" value={stats.totalImages} icon={<Images size={22} />} />
          <KpiCard label="圖組總數" value={stats.totalGroups} icon={<FolderTree size={22} />} />
          <KpiCard label="分類總數" value={stats.totalCategories} icon={<Tags size={22} />} />
          <KpiCard label="留言總數" value={stats.totalMessages} icon={<MessageCircle size={22} />} />
        </div>

        <DashboardCharts categoryStats={stats.categoryStats} topGroups={stats.topGroups} />

      </div>
    </div>
  );
}
