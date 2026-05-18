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

  const isSearching = !!(q || cat);

  const searchResults: SearchResult[] = isSearching
    ? mockGroups.flatMap((g) => {
      const matchCat =
        !cat || g.category_main === cat || g.category_sub === cat;

      if (!matchCat) return [];

      // 只有分類
      if (!q) {
        const cover =
          g.images?.find((img) => img.is_cover) ?? g.images?.[0];

        return cover ? [{ matchedImage: cover, group: g }] : [];
      }

      const normalizedQ = normalize(q);

      // 搜圖片 title
      const matchedImages =
        g.images?.filter((img) =>
          normalize(img.title).includes(normalizedQ)
        ) ?? [];

      if (matchedImages.length > 0) {
        return matchedImages.map((img) => ({
          matchedImage: img,
          group: g,
        }));
      }

      // 搜 group keyword + 注音
      const matchGroup =
        normalize(g.group_keyword).includes(normalizedQ) ||
        normalize(g.group_keyword_zhuyin).includes(normalizedQ);

      if (matchGroup) {
        return (
          g.images?.map((img) => ({
            matchedImage: img,
            group: g,
          })) ?? []
        );
      }

      return [];
    })
    : [];

  return (
    <div className="min-h-screen bg-[#FFF5F8]">
      <div className="max-w-7xl mx-auto p-8 space-y-8">

        {/* Hero */}
        <div className="rounded-3xl bg-white border-2 border-[#FFD1E0] p-8 shadow-md">
          <h1 className="text-4xl font-bold text-[#8B3A62] flex items-center gap-3">
            🐰 UsaminJoke
          </h1>

          <p className="text-[#C48AA3] mt-3 text-lg">
            探索最荒謬、最可愛、最讓人噴笑的諧音梗圖宇宙 ✨
          </p>
        </div>

        {/* Search */}
        <SearchBar />

        {/* Search Results */}
        {isSearching && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#8B3A62]">
              {q
                ? `搜尋「${q}」的結果（${searchResults.length} 張）`
                : `分類篩選結果（${searchResults.length} 張）`}
            </h2>

            {searchResults.length === 0 ? (
              <div className="rounded-3xl bg-white border-2 border-[#FFD1E0] p-8 text-center shadow-sm">
                <p className="text-[#C48AA3] text-lg">
                  找不到相關梗圖 🥺
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {searchResults.map(({ matchedImage, group }) => (
                  <MemeGroupCard
                    key={matchedImage.id}
                    group={group}
                    matchedImage={matchedImage}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* 全部圖組 */}
        {!isSearching && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#8B3A62] flex items-center gap-2">
              🎀 全部圖組
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {mockGroups.map((g) => (
                <MemeGroupCard key={g.id} group={g} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}