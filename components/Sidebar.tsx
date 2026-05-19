'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Rabbit } from "lucide-react";

type Category = {
  id: string;
  name: string;
  parent_id: string | null;
};

export default function Sidebar() {
  const [open, setOpen] = useState<string | null>(null);
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCat = searchParams.get("cat") || "";

  useEffect(() => {
    supabase
      .from('categories')
      .select('*')
      .order('created_at')
      .then(({ data }) => {
        if (data) setAllCategories(data);
      });
  }, []);

  const toggle = (id: string) => {
    setOpen((prev) => (prev === id ? null : id));
  };

  const setCategory = (id: string) => {
    router.push(id ? `/?cat=${id}` : "/");
  };

  const mainCategories = allCategories.filter(c => c.parent_id === null);

  const closeDrawer = () => {
    const drawer = document.getElementById('main-drawer') as HTMLInputElement;
    if (drawer) drawer.checked = false;
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="font-bold text-xl text-[#8B3A62] mb-4 shrink-0 flex items-center gap-2 ml-2">
        <Rabbit /> 分類
      </h2>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">

        {/* 全部 */}
        <button
          onClick={() => {
            setCategory("");
            closeDrawer();
          }}
          className={`
            w-full text-left px-4 py-3 rounded-2xl transition-all font-medium cursor-pointer
            ${currentCat === ""
              ? "bg-[#FF6FA7] text-white shadow-md"
              : "text-[#8B3A62] hover:bg-[#FFE9F1]"
            }
          `}
        >
          全部
        </button>

        {mainCategories.map((catItem) => {
          const subs = allCategories.filter(c => c.parent_id === catItem.id);
          const isOpen = open === catItem.id;
          const isActive = currentCat === catItem.id;

          return (
            <div key={catItem.id} className="rounded-2xl">

              {/* Parent */}
              <button
                onClick={() => {
                  toggle(catItem.id);
                  setCategory(catItem.id);
                }}
                className={`
                  w-full px-4 py-3 rounded-2xl font-medium transition-all cursor-pointer
                  ${isActive
                    ? "bg-[#FF9BC1] text-white shadow-sm"
                    : "text-[#8B3A62] hover:bg-[#FFE9F1]"
                  }
                `}
              >
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    {catItem.name}
                    {isActive && <span className="text-xs">●</span>}
                  </span>
                  {subs.length > 0 && (
                    <span className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}>
                      ▶
                    </span>
                  )}
                </div>
              </button>

              {/* Children */}
              {subs.length > 0 && (
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-80 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                  <ul className="pl-4 space-y-2">
                    {subs.map((c) => {
                      const childActive = currentCat === c.id;
                      return (
                        <li key={c.id}>
                          <button
                            onClick={() => {
                              setCategory(c.id);
                              closeDrawer();
                            }}
                            className={`
                              w-full text-left px-3 py-2 rounded-xl text-sm transition cursor-pointer 
                              ${childActive
                                ? "bg-[#FFD1E0] text-[#D85D93] font-semibold"
                                : "text-[#8B3A62] hover:bg-[#FFF0F5]"
                              }
                            `}
                          >
                            #{c.name}
                          </button>
                        </li>
                      );
                    })}
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