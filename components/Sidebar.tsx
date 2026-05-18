'use client';

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/constants/categories";

export default function Sidebar() {
  const [open, setOpen] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  
  const cat = searchParams.get("cat") || "";

  const toggle = (id: string) => {
    setOpen(prev => (prev === id ? null : id));
  };

  const setCategory = (id: string) => {
    router.push(`/?cat=${id}`);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="font-bold mb-3 shrink-0">分類</h2>

      <div className="flex-1 overflow-y-auto space-y-1">

        {/* 全部 */}
        <button
          onClick={() => setCategory("")}
          className="w-full text-left px-3 py-2 rounded-md hover:bg-base-300"
        >
          全部
        </button>

        {categories.map((catItem) => {
          const isOpen = open === catItem.id;

          return (
            <div key={catItem.id} className="rounded-md">

              {/* parent */}
              <button
                onClick={() => {
                  toggle(catItem.id);
                  setCategory(catItem.id);
                }}
                className="
                  w-full text-left px-3 py-2 rounded-md
                  font-medium hover:bg-base-300 transition
                "
              >
                <div className="flex justify-between items-center">
                  <span>{catItem.name}

                    {/* highlight current cat（加分） */}
                    {cat === catItem.id && (
                      <span className="ml-2 text-xs text-primary">
                        ●
                      </span>
                    )}

                  </span>

                  {catItem.children && (
                    <span className={`${isOpen ? 'rotate-90' : ''}`}>
                      ▶
                    </span>
                  )}
                </div>
              </button>

              {/* children */}
              {catItem.children && (
                <div className={`
                  overflow-hidden transition-all duration-300
                  ${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  <ul className="pl-6 mt-1 space-y-1">
                    {catItem.children.map((c) => (
                      <li key={c.id}>
                        <button
                          onClick={() => setCategory(c.id)}
                          className="block w-full text-left px-2 py-1 rounded-md hover:bg-base-300"
                        >
                          {c.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
}