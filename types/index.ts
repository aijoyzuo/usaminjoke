//types/index.ts

// ==================
// 分類
// ==================
export type Category = {
  id: string
  name: string
  children?: Category[]
}

// ==================
// 圖片 & 圖組
// ==================
export type MemeImage = {
  id: string
  group_id: string
  title: string
  tags?: string[]    
  url: string
  order: number
  is_cover: boolean
}

export type MemeGroup = {
  id: string
  group_keyword: string
  group_keyword_zhuyin: string
  category_main: string | null  // 存分類 id；未歸檔時為 null
  category_sub?: string | null  // 存分類 id；未歸檔時為 null
  cover_image_id: string
  is_featured: boolean
  featured_order?: number
  created_at: string
  images?: MemeImage[]
}

export type SearchResult = {
  matchedImage: MemeImage    // 符合搜尋的那張圖
  group: MemeGroup           // 它所屬的圖組
}

// ==================
// Redux State 用
// ==================
export type CategorySelection = {
  main: string | null           // "animal"
  sub: string | null            // "crab"
}

export type AuthState = {
  isLoggedIn: boolean
}

