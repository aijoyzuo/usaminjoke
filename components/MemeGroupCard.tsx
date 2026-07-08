import Link from "next/link";
import Image from "next/image";
import { MemeGroup, MemeImage } from "@/types";
import { Search } from "lucide-react"

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



    </Link>
  );
}