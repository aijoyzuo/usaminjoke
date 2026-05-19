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

  useEffect(() => {
    if (highlight && highlightRef.current) {
      highlightRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
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
    <div className="min-h-screen bg-[#FFF5F8] p-8 space-y-8">

      {/* Header */}
      <div className="rounded-3xl bg-white border-2 border-[#FFD1E0] p-6 shadow-md">
        <h1 className="text-2xl font-bold text-[#8B3A62] flex items-center gap-3">
          關鍵字： {group.group_keyword}
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {group.images?.map((img) => {
          const isHighlighted = img.id === highlight;

          return (
            <div
              key={img.id}
              id={img.id}
              ref={isHighlighted ? highlightRef : null}
              className={`
                rounded-3xl p-3 bg-white border-2 transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl
                ${isHighlighted
                  ? "border-[#FF6FA7] shadow-[0_0_25px_rgba(255,111,167,0.35)]"
                  : "border-[#FFD1E0] shadow-md"
                }
              `}
            >
              {/* Image */}
              <img
                src={img.url}
                alt={img.title}
                className="
                  rounded-2xl cursor-pointer
                  hover:scale-105 transition duration-300
                  w-full
                "
                onClick={() => setSelectedImage(img.url)}
              />

              {/* Title */}
              {/* <p className="text-sm font-semibold text-[#8B3A62] mt-3 truncate">
                {img.title}
              </p> */}

              {/* Buttons */}
              <div className="flex gap-2 mt-3">
                {/* <button
                  className="
                    flex-1 px-3 py-2 rounded-xl
                    cursor-pointer
                    border-2 border-[#FF9BC1]
                    text-[#D85D93]
                    text-xs font-medium
                    hover:bg-[#FFE9F1]
                    transition
                  "
                  onClick={() => downloadImage(img.url)}
                >
                  下載
                </button> */}

                <button
                  disabled
                  className="
                  flex-1 px-3 py-2 rounded-xl
                  border-2 border-[#FFDCE8]
                  bg-[#FFF7FA]
                  text-[#D9A8BC]
                  text-xs font-medium
                  cursor-not-allowed
                  opacity-70
                "
                >
                  下載
                </button>

                <button
                  className="
                    flex-1 px-3 py-2 rounded-xl
                    cursor-pointer
                    bg-[#FF6FA7]
                    text-white
                    text-xs font-medium
                    hover:bg-[#FF5B99]
                    transition
                  "
                  onClick={() => copyLink(img.url)}
                >
                  複製
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