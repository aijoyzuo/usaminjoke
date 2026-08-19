'use client';

import { useEffect } from "react";
import Image from "next/image";

type Props = {
  url: string;
  onClose: () => void;
};

export default function ImageModal({ url, onClose }: Props) {
  // ESC 關閉
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // 鎖定背景捲動
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[300]"
      onClick={onClose}
    >
      {/* 關閉按鈕 */}
      <button
        className="absolute top-4 right-4 text-white text-2xl leading-none"
        onClick={onClose}
      >
        ✕
      </button>

      <div
        className="relative w-[90vw] h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={url}
          alt="梗圖"
          fill
          sizes="90vw"
          className="object-contain rounded-lg"
        />
      </div>
    </div>
  );
}