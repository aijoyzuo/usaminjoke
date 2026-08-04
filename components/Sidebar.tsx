'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
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
    const fetchCategories = () => {
      supabase
        .from('categories')
        .select('*')
        .order('created_at')
        .then(({ data }) => {
          if (data) setAllCategories(data);
        });
    };

    fetchCategories();

    const channel = supabase
      .channel('categories-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'categories' },
        fetchCategories
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const toggle = (id: string) => {
    setOpen((prev) => (prev === id ? null : id));
  };

  const setCategory = (id: string) => {
    const params = new URLSearchParams();

    const q = searchParams.get("q");
    if (q) {
      params.set("q", q);
    }

    if (id) {
      params.set("cat", id);
    }

    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
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
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-56 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                  <div className="flex flex-wrap gap-1.5 pl-4 pr-1 pb-1 max-h-56 overflow-y-auto">
                    {subs.map((c) => {
                      const childActive = currentCat === c.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => {
                            setCategory(c.id);
                            closeDrawer();
                          }}
                          className={`
                            px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer
                            ${childActive
                              ? "bg-[#FF9BC1] text-white"
                              : "bg-[#FFF0F5] text-[#8B3A62] hover:bg-[#FFD1E0] hover:text-[#D85D93]"
                            }
                          `}
                        >
                          #{c.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}