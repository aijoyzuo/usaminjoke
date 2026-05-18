import Link from "next/link";
import Sidebar from "./Sidebar";

export default function DrawerMenu() {
  return (
    <div className="w-64  bg-[#FFE9F1] h-screen flex flex-col overflow-hidden border-r-2 border-[#FFD1E0] shadow-lg">

      {/* Mobile Logo */}
      <div className="lg:hidden p-5 border-b border-[#FFD1E0]">
        <p className="text-2xl font-bold text-[#8B3A62] flex items-center gap-2">
          UsaminJoke
        </p>
      </div>

      {/* Mobile Nav */}
      <ul className="menu p-4 w-full lg:hidden text-[#8B3A62] font-medium space-y-2">
        <li>
          <Link
            href="/"
            className="rounded-xl hover:bg-[#FFE9F1] hover:text-[#FF6FA7] transition"
          >
            首頁
          </Link>
        </li>

        <li>
          <Link
            href="/creators"
            className="rounded-xl hover:bg-[#FFE9F1] hover:text-[#FF6FA7] transition"
          >
            創作者
          </Link>
        </li>

        <li>
          <Link
            href="/message-board"
            className="rounded-xl hover:bg-[#FFE9F1] hover:text-[#FF6FA7] transition"
          >
            留言板
          </Link>
        </li>

        <li>
          <Link
            href="/creator-portal"
            className="rounded-xl bg-[#FF6FA7] text-white hover:bg-[#FF5B99] transition"
          >
            創作者專區
          </Link>
        </li>
      </ul>

      {/* Divider */}
      <div className="mx-4 lg:hidden border-t border-[#FFD1E0]" />

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
          <Sidebar />
        </div>
      </div>
    </div>
  );
}