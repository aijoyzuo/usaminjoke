import Link from "next/link";
import { MemeGroup, MemeImage } from "@/types";

type Props = {
  group: MemeGroup
  matchedImage?: MemeImage  
}

export default function MemeGroupCard({ group, matchedImage }: Props) {
  const coverImage = group.images?.find(img => img.is_cover) ?? group.images?.[0]
  const displayImage = matchedImage ?? coverImage

  const href = matchedImage
    ? `/group/${group.id}?highlight=${matchedImage.id}`
    : `/group/${group.id}`

  return (
    <Link href={href} className="rounded-lg overflow-hidden border border-base-300 hover:shadow-md transition block">
      <div className="aspect-square overflow-hidden">
        <img
          src={displayImage?.url}
          alt={displayImage?.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-2">
        <p className="text-sm font-medium truncate">{displayImage?.title}</p>
        {matchedImage && !matchedImage.is_cover && (
          <p className="text-xs text-base-content/50 truncate">
            圖組：{group.group_keyword}
          </p>
        )}
      </div>
    </Link>
  )
}