'use client';

import { useSearchParams } from "next/navigation";
import { mockGroups } from "@/constants/mockData";
import { SearchResult } from "@/types";
import SearchBar from "@/components/SearchBar";
import MemeGroupCard from "@/components/MemeGroupCard";

const normalize = (str: string) => str.trim().toLowerCase();

export default function Home() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const cat = searchParams.get("cat") || "";

  const featured = mockGroups.filter(g => g.is_featured);
  const isSearching = !!(q || cat);

  const searchResults: SearchResult[] = isSearching
    ? mockGroups.flatMap(g => {
        const matchCat = !cat || g.category_main === cat || g.category_sub === cat;
        if (!matchCat) return [];

        // 只有分類、沒有關鍵字 → 顯示封面
        if (!q) {
          const cover = g.images?.find(img => img.is_cover) ?? g.images?.[0];
          return cover ? [{ matchedImage: cover, group: g }] : [];
        }

        // 找圖片 title 符合的
        const matchedImages = g.images?.filter(img =>
          normalize(img.title).includes(normalize(q))
        ) ?? [];

        if (matchedImages.length > 0) {
          return matchedImages.map(img => ({ matchedImage: img, group: g }));
        }

        // 圖片沒中，看 group_keyword 有沒有中
        const matchGroup = normalize(g.group_keyword).includes(normalize(q));
        if (matchGroup) {
          const cover = g.images?.find(img => img.is_cover) ?? g.images?.[0];
          return cover ? [{ matchedImage: cover, group: g }] : [];
        }

        return [];
      })
    : [];

  return (
    <div className="flex">
      <div className="flex-1 p-6 space-y-6">

      

        {/* 2️⃣ 搜尋欄 */}
        <SearchBar />

        {/* 3️⃣ 搜尋結果 */}
        {isSearching && (
          <div>
            <h2 className="font-bold mb-2">
              {q
                ? `搜尋「${q}」的結果（${searchResults.length} 張）`
                : `分類篩選結果（${searchResults.length} 張）`
              }
            </h2>
            {searchResults.length === 0
              ? <p className="text-base-content/50">找不到相關梗圖</p>
              : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

        {/* 4️⃣ 全部圖組：沒有搜尋才顯示 */}
        {!isSearching && (
          <div>
            <h2 className="font-bold mb-2">全部圖組</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockGroups.map(g => (
                <MemeGroupCard key={g.id} group={g} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}