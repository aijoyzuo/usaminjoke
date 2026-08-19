'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MemeGroup, MemeImage } from "@/types";
import { Folder } from "lucide-react"
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

  // 這張圖所屬的圖組只有它自己一張圖時，直接彈出放大圖；
  // 圖組內還有其他圖片，一律進圖組詳情頁（並定位到這張圖）
  const isSingleImageShortcut = (group.images?.length ?? 0) === 1;

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


      {!isSingleImageShortcut && (
        <div className="p-1 flex justify-end">
          <div
            className="
            text-[#D85D93]
            flex items-center justify-center
            w-7 h-7 rounded-full
      bg-white/85
          "
          >
            <Folder size={14} />
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