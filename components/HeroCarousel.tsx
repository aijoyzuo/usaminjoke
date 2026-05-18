'use client';

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MemeGroup } from "@/types";

export default function HeroCarousel({
  groups
}: {
  groups: MemeGroup[];
}) {
  const router = useRouter();
  const items = groups.slice(0, 4);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);  

  const current = items[index];

  const next = () => {
    setIndex(prev => (prev + 1) % items.length);
  };

  const prev = () => {
    setIndex(prev => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToGroup = () => {
    router.push(`/group/${current.id}`);
  };

  // 自動輪播
  useEffect(() => {
    if (paused) return;

    intervalRef.current = setInterval(() => {
      setIndex(prev => (prev + 1) % items.length);
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [paused, items.length]);

  if (!items.length) return null;

  return (
    <div
      className="relative w-full aspect-square md:aspect-video md:h-64 rounded-lg overflow-hidden cursor-pointer"
      onMouseEnter={() => setPaused(true)}   // hover pause
      onMouseLeave={() => setPaused(false)}  // resume
    >

      {/* image */}
      <img
        src={current.images?.[0]?.url}
        className="w-full h-full object-cover"
        onClick={goToGroup}
      />

      {/* overlay */}
      <div
        onClick={goToGroup}
        className="absolute bottom-0 left-0 right-0 bg-black/40 text-white p-3"
      >
        <div className="font-bold">
          {current.group_keyword}
        </div>
      </div>

      {/* controls */}
      <button
         className="
    absolute left-2 top-1/2 -translate-y-1/2

    text-white text-2xl
  
    transition-all duration-200
  
    hover:scale-120
    hover:text-gray-300   

    active:scale-95

    cursor-pointer
  "
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
      >
        ◀
      </button>

      <button
        className="absolute right-2 top-1/2 text-white text-2xl 
         transition-all duration-200
  
    hover:scale-120
    hover:text-gray-300   

    active:scale-95
    
        cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
      >
        ▶
      </button>

      {/* 🔥 indicator dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setIndex(i);
            }}
            className={`
              w-2.5 h-2.5 rounded-full transition-all
              ${i === index
                ? "bg-white scale-125"
                : "bg-white/40"}
            `}
          />
        ))}
      </div>

    </div>
  );
}