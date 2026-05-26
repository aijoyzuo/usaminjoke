'use client';

import Link from "next/link";
import { HouseHeart, Rabbit, MessageSquareHeart, PenTool, Menu } from "lucide-react";
import AdminLink from '@/components/AdminLink';

const closeDrawer = () => {
  const drawer = document.getElementById('main-drawer') as HTMLInputElement;
  if (drawer) drawer.checked = false;
};

export default function Navbar() {
  return (

    <div className="navbar bg-[#FFD1E0] bg-[radial-gradient(#FFF5F8_10%,transparent_11%),radial-gradient(#FFF5F8_10%,transparent_11%)]
bg-[position:0_0,80px_80px]
bg-[size:130px_130px] px-6 py-3 border-b-2 border-[#FFD1E0] shadow-sm sticky top-0 z-50 backdrop-blur-md">

      {/* Left */}
      <div className="navbar-start">
        <label
          htmlFor="main-drawer"
          className="btn btn-ghost lg:hidden text-[#8B3A62] hover:bg-[#FFE9F1] border-none"
        >
          <Menu strokeWidth={3} />
        </label>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2
      lg:static lg:translate-x-0 text-2xl font-bold text-[#8B3A62] tracking-tight flex items-center gap-2"
        >
          <span onClick={closeDrawer} className="text-nowrap flex gap-1 items-center"><Rabbit />救渴の輕鬆小棧</span>
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1 text-[#8B3A62] font-medium">
          <li>
            <Link
              href="/"
              className="rounded-xl hover:bg-[#FFE9F1] hover:text-[#FF6FA7] transition flex items-center"
            >
              <HouseHeart size={18} />
              <span className="mt-1">首頁</span>
            </Link>
          </li>

          <li>
            <Link
              href="/creators"
              className="rounded-xl hover:bg-[#FFE9F1] hover:text-[#FF6FA7] transition flex items-center"
            >
              <PenTool size={18} />
              <span className="mt-1">創作者</span>
            </Link>
          </li>

          <li>
            <Link
              href="/messageboard"
              className="rounded-xl hover:bg-[#FFE9F1] hover:text-[#FF6FA7] transition flex items-center"
            >
              <MessageSquareHeart size={18} />
              <span className="mt-1">留言板</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end hidden lg:flex">
        <AdminLink />
      </div>
    </div>

  );
}