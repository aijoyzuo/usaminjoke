'use client';

import { useRef, useState } from "react";
import Image from "next/image";
import { useBackroom } from "@/contexts/BackroomContext";

const MAX_DRAG = 40;

export default function BackroomOverlay() {
  const { isOn } = useBackroom();
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startPointerX = useRef(0);
  const startDragX = useRef(0);

  if (!isOn) return null;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    startPointerX.current = e.clientX;
    startDragX.current = dragX;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const delta = e.clientX - startPointerX.current;
    const next = Math.max(-MAX_DRAG, Math.min(MAX_DRAG, startDragX.current + delta));
    setDragX(next);
  };

  const handlePointerUp = () => {
    setDragging(false);
    setDragX(0);
  };

  return (
    <div
      className="fixed inset-0 z-[100] cursor-grab overflow-hidden select-none active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div
        className={`absolute inset-0 ${dragging ? "" : "transition-transform duration-500 ease-out"}`}
        style={{ transform: `translateX(${dragX}px) scale(1.05)` }}
      >
        <Image
          src="https://images.plurk.com/2yr3sBJZyvhuAv11lExGeQ.png"
          alt=""
          fill
          sizes="100vw"
          draggable={false}
          className="object-cover"
        />
        <Image
          src="https://images.plurk.com/2jnrSG1DTeRTSkQ0V2jMwg.png"
          alt=""
          width={413}
          height={531}
          draggable={false}
          className="peek-character absolute top-1/2 right-[35%] w-10 h-auto -translate-y-1/2 sm:w-10"
        />
      </div>
    </div>
  );
}
