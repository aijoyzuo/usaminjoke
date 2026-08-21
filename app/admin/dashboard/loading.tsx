export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#FFF5F8] bg-[radial-gradient(#FFD1E0_1.5px,transparent_1.5px)] bg-[size:28px_28px]">
      <div className="max-w-6xl mx-auto p-8 space-y-6 animate-pulse">
        <div className="rounded-3xl bg-white border-2 border-[#FFD1E0] p-6 h-[76px]" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="rounded-3xl bg-white border-2 border-[#FFD1E0] h-[84px]" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-3xl bg-white border-2 border-[#FFD1E0] h-[368px]" />
          <div className="rounded-3xl bg-white border-2 border-[#FFD1E0] h-[368px]" />
        </div>
      </div>
    </div>
  );
}
