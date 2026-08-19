'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MemeGroup, MemeImage } from "@/types";
import { Search } from "lucide-react"
import ImageModal from "@/components/ImageModal";

type Props = {
  group: MemeGroup;
  matchedImage?: MemeImage;
};

export default function MemeGroupCard({ group, matchedImage }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const coverImage =
    group.images?.find((img) => img.is_cover) ?? group.images?.[0];

  const displayImage = matchedImage ?? coverImage;

  // 只有在未經 Drawer 分類篩選或搜尋（沒有 matchedImage）且圖組只有一張圖時，
  // 才直接彈出放大圖，其餘情況一律進圖組詳情頁
  const isSingleImageShortcut = !matchedImage && group.images?.length === 1;

  const href = matchedImage
    ? `/group/${group.id}?highlight=${matchedImage.id}`
    : `/group/${group.id}`;

  const cardContent = (
    <>
      <div className="relative aspect-square overflow-hidden">
        {displayImage?.url && (
          <Image
            src={displayImage.url}
            alt={displayImage.title}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover hover:scale-105 transition duration-500"
          />
        )}
      </div>


      {matchedImage && !matchedImage.is_cover && (
        <div className="p-1 flex justify-end">
          <div
            className="
            text-[#D85D93]
            text-sm font-semibold
            flex items-center gap-1
            px-2 py-1 rounded-2xl
      bg-white/85
          "
          >
            <Search size={14} />
            {group.group_keyword}
          </div>
        </div>
      )}
    </>
  );

  const cardClassName = `
        block w-full text-left rounded-3xl overflow-hidden
        bg-white
        border-2 border-[#FFD1E0]
        shadow-md
        hover:shadow-xl
        hover:-translate-y-1
        transition-all duration-300
      `;

  if (isSingleImageShortcut) {
    return (
      <>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className={cardClassName}
        >
          {cardContent}
        </button>
        {modalOpen && displayImage?.url && (
          <ImageModal url={displayImage.url} onClose={() => setModalOpen(false)} />
        )}
      </>
    );
  }

  return (
    <Link href={href} className={cardClassName}>
      {cardContent}
    </Link>
  );
}