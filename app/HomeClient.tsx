'use client';

import { Suspense } from 'react';
import { useSearchParams } from "next/navigation";
import { MemeGroup, SearchResult } from "@/types";
import SearchBar from "@/components/SearchBar";
import MemeGroupCard from "@/components/MemeGroupCard";
import { zhuyinIncludes } from "@/lib/zhuyin";

const normalize = (str: string) => str.trim().toLowerCase();

export default function HomeClient({ groups }: { groups: MemeGroup[] }) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const cat = searchParams.get("cat") || "";

  const isFiltering = !!(q || cat);

  // 一律以「圖片」為單位展開，不再用圖組封面代表整組，讓首頁看起來圖很多
  const displayResults: SearchResult[] = groups.flatMap(g => {
    const matchCat = !cat || g.category_main === cat || g.category_sub === cat;
    if (!matchCat) return [];

    if (!q) {
      return g.images?.map(img => ({ matchedImage: img, group: g })) ?? [];
    }

    const matchedImages = g.images?.filter(img =>
      normalize(img.title).includes(normalize(q)) ||
      img.tags?.some(tag => normalize(tag).includes(normalize(q)))
    ) ?? [];

    if (matchedImages.length > 0) {
      return matchedImages.map(img => ({ matchedImage: img, group: g }));
    }

    const normalizedQ = normalize(q);
    const matchGroup =
      normalize(g.group_keyword).includes(normalizedQ) ||
      zhuyinIncludes(g.group_keyword_zhuyin || "", q);

    if (matchGroup) {
      return g.images?.map(img => ({
        matchedImage: img,
        group: g
      })) ?? [];
    }

    return [];
  });

  return (
    <div
      className="
    min-h-screen
    bg-[#FFF5F8]
    bg-[radial-gradient(#FFD1E0_1.5px,transparent_1.5px)]
    bg-[size:30px_30px]
  ">
      <div className="flex">
        <div className="flex-1 p-6 space-y-6">

          <Suspense>
            <SearchBar />
          </Suspense>

          <div>
            <h2 className="font-bold mb-2 text-[#8b3a62]">
              {q
                ? `搜尋「${q}」的結果（${displayResults.length} 張）`
                : cat
                ? `分類篩選結果（${displayResults.length} 張）`
                : '逛逛吳莎敏的窩'
              }
            </h2>
            {displayResults.length === 0
              ? <p className="text-base-content/50">{isFiltering ? '找不到相關梗圖' : '目前還沒有梗圖'}</p>
              : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 lg:gap-6">
                  {displayResults.map(({ matchedImage, group }) => (
                    <MemeGroupCard
                      key={matchedImage.id}
                      group={group}
                      matchedImage={matchedImage}
                    />
                  ))}
                </div>
              )
            }
          </div>

        </div>
      </div>
    </div>
  );
}