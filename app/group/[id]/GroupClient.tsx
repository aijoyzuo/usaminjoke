'use client';

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import ImageModal from "@/components/ImageModal";
import { MemeGroup } from "@/types";

export default function GroupClient({ group }: { group: MemeGroup }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const highlight = searchParams.get("highlight");
  const highlightRef = useRef<HTMLDivElement | null>(null);

  // 有 highlight 時自動捲動
  useEffect(() => {
    if (highlight && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlight]);

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const downloadImage = async (url: string) => {
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "meme.jpg";
    a.click();
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">{group.group_keyword}</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {group.images?.map(img => {
          const isHighlighted = img.id === highlight;

          return (
            <div
              key={img.id}
              id={img.id}
              ref={isHighlighted ? highlightRef : null}
              className={`space-y-2 rounded-lg p-1 transition ${
                isHighlighted ? "ring-2 ring-primary" : ""
              }`}
            >
              <img
                src={img.url}
                alt={img.title}
                className="rounded-lg cursor-pointer hover:scale-105 transition w-full"
                onClick={() => setSelectedImage(img.url)}
              />

              <p className="text-sm font-medium">{img.title}</p>

              <div className="flex gap-2 text-sm">
                <button
                  className="btn btn-xs btn-outline"
                  onClick={() => downloadImage(img.url)}
                >
                  下載
                </button>
                <button
                  className="btn btn-xs btn-outline"
                  onClick={() => copyLink(img.url)}
                >
                  複製連結
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedImage && (
        <ImageModal
          url={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}     