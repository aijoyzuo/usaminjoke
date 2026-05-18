import Link from "next/link";
import Sidebar from "./Sidebar";

export default function DrawerMenu() {
    return (
        <div className="w-64 bg-base-200 h-screen flex flex-col overflow-hidden">
            <p className="text-xl font-bold p-4 lg:hidden">UsamiJoke</p>

            <ul className="menu p-4 w-full lg:hidden">
                <li><Link href="/">首頁</Link></li>
                <li><Link href="/creators">創作者</Link></li>
                <li><Link href="/message-board">留言板</Link></li>
                <li><Link href="/creator-portal">創作者專區</Link></li>
            </ul>

            <hr className="lg:hidden" />
            <div className="p-4 w-60 h-60 hidden md:block">
                <img src="https://images.plurk.com/1XMEs6gpBbJRe6ZeSak7Sl.jpg" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="flex-1 min-h-0 p-4">
                <Sidebar/>
            </div>
        </div>
    );
}