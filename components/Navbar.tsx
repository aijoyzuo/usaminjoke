import Link from "next/link";
import { HouseHeart, Rabbit, MessageSquareHeart, Settings, PenTool } from "lucide-react";
import AdminLink from '@/components/AdminLink';


export default function Navbar() {
  return (
    <div className="navbar bg-[#FFD1E0] px-6 py-3 border-b-2 border-[#FFD1E0] shadow-sm sticky top-0 z-50 backdrop-blur-md">

      {/* Left */}
      <div className="navbar-start">
        <label
          htmlFor="main-drawer"
          className="btn btn-ghost lg:hidden text-[#8B3A62] hover:bg-[#FFE9F1] border-none"
        >
          ☰
        </label>

        <Link
          href="/"
          className="text-2xl font-bold text-[#8B3A62] tracking-tight flex items-center gap-2"
        >
          <span className="text-nowrap flex gap-1 items-center"><Rabbit />救渴の輕鬆小棧</span>
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