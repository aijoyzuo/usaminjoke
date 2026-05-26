import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import DrawerMenu from "@/components/DrawerMenu";



export const metadata: Metadata = {
  title: {
    default: "吳莎敏｜諧音梗圖搜尋",
    template: "%s｜UsaminJoke",  // 各分頁標題會套這個格式
  },
  description: "諧音梗圖搜尋網站，收錄吳莎敏創作的各種諧音梗圖",
  keywords: ["諧音梗", "梗圖", "台灣", "吳莎敏", "usaminjoke","新細敏體","輕鬆小棧"],
  authors: [{ name: "usaminjoke" }],
  openGraph: {
    title: "吳莎敏｜諧音梗圖搜尋",
    description: "台灣最好笑的諧音梗圖搜尋網站",
    url: "https://usaminjoke.vercel.app/",
    siteName: "UsaminJoke",
     images: [
      {
        url: "https://usaminjoke.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "UsamiJoke",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
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

