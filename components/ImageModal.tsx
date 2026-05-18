'use client';

import { useEffect } from "react";

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
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* 關閉按鈕 */}
      <button
        className="absolute top-4 right-4 text-white text-2xl leading-none"
        onClick={onClose}
      >
        ✕
      </button>

      <img
        src={url}
        alt="梗圖"
        className="max-w-[90%] max-h-[90%] rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}