'use client';

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { CategoryStat, GroupStat } from '@/lib/dashboard';

const PIE_COLORS = ['#FF4785', '#FF6FA7', '#FF8FBB', '#FFA8CB', '#FFC2DB', '#FFD1E0', '#FFE3ED', '#FBCFE8'];

const tooltipStyle = {
  borderRadius: 12,
  border: '2px solid #FFD1E0',
  color: '#8B3A62',
  fontSize: 13,
};

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white border-2 border-[#FFD1E0] p-6 shadow-md">
      <h2 className="text-lg font-bold text-[#8B3A62] mb-4">{title}</h2>
      {children}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="h-64 flex items-center justify-center text-[#C48AA3] text-sm">
      目前還沒有資料
    </div>
  );
}

export default function DashboardCharts({
  categoryStats,
  topGroups,
}: {
  categoryStats: CategoryStat[];
  topGroups: GroupStat[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartCard title="各分類梗圖數量">
        {categoryStats.length === 0 ? (
          <EmptyState />
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={categoryStats}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="46%"
                outerRadius={100}
                paddingAngle={2}
              >
                {categoryStats.map((entry, i) => (
                  <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value) => [`${value} 張`, '梗圖數量']}
              />
              <Legend wrapperStyle={{ fontSize: 12, color: '#8B3A62' }} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard title="圖片數量 Top 10 圖組">
        {topGroups.length === 0 ? (
          <EmptyState />
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={topGroups}
              layout="vertical"
              margin={{ top: 8, right: 24, left: 8, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#FFE3ED" horizontal={false} />
              <XAxis type="number" allowDecimals={false} tick={{ fill: '#8B3A62', fontSize: 12 }} />
              <YAxis
                type="category"
                dataKey="keyword"
                width={90}
                tick={{ fill: '#8B3A62', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                cursor={{ fill: '#FFF0F6' }}
                formatter={(value) => [`${value} 張`, '梗圖數量']}
              />
              <Bar dataKey="count" radius={[0, 8, 8, 0]} fill="#FF6FA7" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>
    </div>
  );
}
