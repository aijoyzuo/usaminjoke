'use client';

import { Suspense } from 'react';
import { useSearchParams } from "next/navigation";
import { MemeGroup, SearchResult } from "@/types";
import SearchBar from "@/components/SearchBar";
import MemeGroupCard from "@/components/MemeGroupCard";

const normalize = (str: string) => str.trim().toLowerCase();

export default function HomeClient({ groups }: { groups: MemeGroup[] }) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const cat = searchParams.get("cat") || "";

  const isSearching = !!(q || cat);

  const searchResults: SearchResult[] = isSearching
    ? groups.flatMap(g => {
      const matchCat = !cat || g.category_main === cat || g.category_sub === cat;
      if (!matchCat) return [];

      if (!q) {
        const cover = g.images?.find(img => img.is_cover) ?? g.images?.[0];
        return cover ? [{ matchedImage: cover, group: g }] : [];
      }

      const matchedImages = g.images?.filter(img =>
        normalize(img.title).includes(normalize(q)) ||
        img.tags?.some(tag => normalize(tag).includes(normalize(q)))  
      ) ?? [];

      if (matchedImages.length > 0) {
        return matchedImages.map(img => ({ matchedImage: img, group: g }));
      }

      const normalizedQ = normalize(q);
      //注音搜尋
      const matchGroup =
        normalize(g.group_keyword).includes(normalizedQ) ||
        normalize(g.group_keyword_zhuyin || "").includes(normalizedQ);

      if (matchGroup) {
        return g.images?.map(img => ({
          matchedImage: img,
          group: g
        })) ?? [];
      }

      return [];
    })
    : [];

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

          {isSearching && (
            <div>
              <h2 className="font-bold mb-2 text-[#8b3a62]">
                {q
                  ? `搜尋「${q}」的結果（${searchResults.length} 張）`
                  : `分類篩選結果（${searchResults.length} 張）`
                }
              </h2>
              {searchResults.length === 0
                ? <p className="text-base-content/50">找不到相關梗圖</p>
                : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
                    {searchResults.map(({ matchedImage, group }) => (
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
          )}

          {!isSearching && (
            <div>
              <h2 className="font-bold mb-2 text-[#8b3a62]">逛逛吳莎敏的窩</h2>
              {groups.length === 0
                ? <p className="text-base-content/50">目前還沒有梗圖</p>
                : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
                    {groups.map(g => (
                      <MemeGroupCard key={g.id} group={g} />
                    ))}
                  </div>
                )
              }
            </div>
          )}

        </div>
      </div>
    </div>
  );
}