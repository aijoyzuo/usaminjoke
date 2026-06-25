'use client';

import { useBackroom } from "@/contexts/BackroomContext";

export default function LightSwitch() {
  const { isOn, toggle } = useBackroom();

  return (
    <button
      onClick={toggle}
      aria-label="切換 backroom 模式"
      aria-pressed={isOn}
      className={`fixed top-5 right-6 lg:right-20 z-[200] hidden md:flex w-5 h-8 items-center justify-center rounded-sm border border-2 cursor-pointer shadow-inner transition-colors duration-300 ${
        isOn ? "border-[#b8b09a] bg-[#e8e2d5]" : "border-[#8B3A62] bg-[#FFD1E0]"
      }`}
    >
      <span
        className={`absolute w-3 h-2 rounded-sm shadow transition-all duration-300 ${
          isOn
            ? "-translate-y-2.5 bg-gradient-to-b from-white to-gray-300"
            : "translate-y-2.5 bg-gradient-to-b from-[#FFF5F8] to-[#FF9BC1]"
        }`}
      />
    </button>
  );
}
