# UsamiJoke｜諧音梗圖搜尋平台

> 台灣諧音梗圖創作者 [@usaminjoke](https://www.threads.com/@usaminjoke) 的專屬梗圖搜尋網站

**Live Demo**: [usaminjoke.vercel.app](https://usaminjoke.vercel.app)

---

## 功能特色

- **諧音模糊搜尋**：支援關鍵字、注音、圖片標籤比對
- **分類側邊欄**：大分類 / 子分類篩選，資料來自 Supabase 動態載入
- **圖組瀏覽**：每組梗圖有封面預覽，點進去可查看整組並複製圖片連結
- **留言板**：匿名留言、選擇頭像、分頁顯示
- **創作者介紹**：介紹創作者與工作人員
- **後台管理系統**：新增 / 編輯 / 刪除梗圖組與圖片、管理分類與子分類、Excel 批次匯入、Supabase Auth 登入驗證

---

## 技術棧

| 類別 | 技術 |
|------|------|
| 前端框架 | Next.js 16 App Router |
| 語言 | TypeScript |
| 樣式 | Tailwind CSS + DaisyUI |
| 資料庫 | Supabase (PostgreSQL) |
| 驗證 | Supabase Auth |
| 部署 | Vercel |
| Icon | Lucide React |

---

## 資料結構

| 表格 | 說明 |
|------|------|
| image_groups | 圖組（關鍵字、注音、分類） |
| images | 圖片（標題、網址、標籤、封面） |
| categories | 分類（大分類 / 子分類） |
| messages | 留言板 |

---

## 本地開發

```bash
git clone https://github.com/aijoyzuo/usaminjoke.git
cd usaminjoke
npm install
```

建立 `.env.local`：
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

```bash
npm run dev
```

---

## 製作

- 梗圖創作：[@usaminjoke](https://www.threads.com/@usaminjoke)
- 網頁開發：joy
