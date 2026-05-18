import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import DrawerMenu from "@/components/DrawerMenu";



export const metadata: Metadata = {
  title: "UsamiJoke",
  description: "梗圖搜尋網站",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" data-theme="usaminjoke">
      <body>
        <div className="drawer lg:drawer-open h-screen overflow-hidden">
          <input id="main-drawer" type="checkbox" className="drawer-toggle" />

          {/* 主要內容 */}
          <div className="drawer-content overflow-y-auto">
            <Navbar />
            {children}
          </div>

          {/* Sidebar / Drawer */}
          <div className="drawer-side">
            <label htmlFor="main-drawer" className="drawer-overlay"></label>            
              <DrawerMenu />            
          </div>
        </div>
      </body>
    </html>
  );
}

