import Link from "next/link";
import { MemeGroup, MemeImage } from "@/types";

type Props = {
  group: MemeGroup;
  matchedImage?: MemeImage;
};

export default function MemeGroupCard({ group, matchedImage }: Props) {
  const coverImage =
    group.images?.find((img) => img.is_cover) ?? group.images?.[0];

  const displayImage = matchedImage ?? coverImage;

  const href = matchedImage
    ? `/group/${group.id}?highlight=${matchedImage.id}`
    : `/group/${group.id}`;

  return (
    <Link
      href={href}
      className="
        block rounded-3xl overflow-hidden
        bg-white
        border-2 border-[#FFD1E0]
        shadow-md
        hover:shadow-xl
        hover:-translate-y-1
        transition-all duration-300
      "
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={displayImage?.url}
          alt={displayImage?.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
      </div>

      <div className="p-4">
        <p className="text-sm font-semibold text-[#8B3A62] truncate">
          {displayImage?.title}
        </p>

        {matchedImage && !matchedImage.is_cover && (
          <p className="text-xs text-[#C48AA3] truncate mt-1">
            圖組：{group.group_keyword}
          </p>
        )}
      </div>
    </Link>
  );
}