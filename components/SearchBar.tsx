'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";
  const [value, setValue] = useState(q);

  useEffect(() => {
    setValue(q);
  }, [q]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (value.trim()) {
      params.set("q", value.trim());
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex gap-3">
      <input
        className="
          flex-1 px-5 py-3 rounded-2xl
          bg-white
          border-2 border-[#FFD1E0]
          text-[#8B3A62]
          placeholder:text-[#C48AA3]
          focus:outline-none
          focus:border-[#FF9BC1]
          focus:ring-4 focus:ring-[#FFE9F1]
          transition
        "
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="🐰 搜尋梗圖..."
      />

      <button
        className="
          px-6 py-3 rounded-2xl
          bg-[#FF6FA7]
          text-white font-medium
          hover:bg-[#FF5B99]
          shadow-md hover:shadow-lg
          transition-all
        "
        onClick={handleSearch}
      >
        搜尋
      </button>
    </div>
  );
}