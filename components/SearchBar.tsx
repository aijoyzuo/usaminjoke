'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";
  const [value, setValue] = useState(q);

  // ✅ 正確：只監聽 q
  useEffect(() => {
    setValue(q);
  }, [q]);

 const handleSearch = () => {
  const params = new URLSearchParams();

  if (value.trim()) {
    params.set("q", value.trim());
  }

  // ❗ 不帶 cat → 清掉分類
  router.push(`/?${params.toString()}`);
};

  return (
    <div className="flex gap-2">
      <input
        className="input input-bordered w-full"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="搜尋梗圖..."
      />
      <button className="btn btn-primary" onClick={handleSearch}>
        搜尋
      </button>
    </div>
  );
}