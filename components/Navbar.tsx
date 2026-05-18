import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 px-4 shadow-sm">
      <div className="navbar-start">
        <label htmlFor="main-drawer" className="btn btn-ghost lg:hidden">
          ☰
        </label>


        <Link href="/" className="text-xl font-bold">
          UsamiJoke
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">首頁</Link>
          </li>
          <li>
            <Link href="/creators">創作者</Link>
          </li>
          <li>
            <Link href="/message-board">留言板</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end hidden lg:flex">
        <Link href="/creator-portal" className="btn btn-outline btn-sm">
          創作者專區
        </Link>
      </div>
    </div>
  );
}