'use client';

import { Suspense } from 'react';
import Link from "next/link";
import Sidebar from "./Sidebar";
import { Settings } from "lucide-react";

const closeDrawer = () => {
  const drawer = document.getElementById('main-drawer') as HTMLInputElement;
  if (drawer) drawer.checked = false;
};

export default function DrawerMenu() {
  return (
    <div className="w-64 bg-[#FFE9F1] h-screen flex flex-col overflow-hidden border-r-2 border-[#FFD1E0] shadow-lg">

      {/* Mobile Logo */}
      <div className="lg:hidden p-5">
        <p className="text-2xl font-bold text-[#8B3A62] flex items-center gap-2">
          UsaminJoke
        </p>
      </div>

      {/* Mobile Nav */}
      <ul className="menu p-4 w-full lg:hidden text-[#8B3A62] font-medium space-y-2">
        <li>
          <Link href="/" onClick={closeDrawer} className="rounded-xl hover:bg-[#FFE9F1] hover:text-[#FF6FA7] transition">首頁</Link>
        </li>
        <li>
          <Link href="/creators" onClick={closeDrawer} className="rounded-xl hover:bg-[#FFE9F1] hover:text-[#FF6FA7] transition">創作者</Link>
        </li>
        <li>
          <Link href="/messageboard" onClick={closeDrawer} className="rounded-xl hover:bg-[#FFE9F1] hover:text-[#FF6FA7] transition">留言板</Link>
        </li>
        <li>
          <Link href="/creator-portal" onClick={closeDrawer} className="rounded-xl hover:bg-[#FFE9F1] hover:text-[#FF6FA7] transition"><Settings size={16}/></Link>
        </li>
      </ul>

      <div className="mx-4 lg:hidden" />

      {/* Bunny Image */}
      <div className="p-4 hidden md:block">
        <div className="rounded-3xl overflow-hidden border-2 border-[#FFB8D2] shadow-md bg-white">
          <img
            src="https://images.plurk.com/1XMEs6gpBbJRe6ZeSak7Sl.jpg"
            className="w-full h-56 object-cover"
            alt="Usamin"
          />
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex-1 min-h-0 p-4 overflow-y-auto">
        <div className="bg-white rounded-3xl border-2 border-[#FFD1E0] p-3 shadow-sm">
          <Suspense fallback={<div className="text-[#C48AA3] text-sm p-2">載入分類...</div>}>
            <Sidebar />
          </Suspense>
        </div>
      </div>

    </div>
  );
}