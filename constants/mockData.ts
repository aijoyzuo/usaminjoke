// constants/mockData.ts
import { MemeGroup } from "@/types";

export const mockGroups: MemeGroup[] = [
  {
    id: "1",
    group_keyword: "蟹",
    group_keyword_zhuyin: "ㄒㄧㄝˋ",
    category_main: "animal",
    category_sub: "crab",
    cover_image_id: "img1-1",
    is_featured: true,
    created_at: "",
    images: [
      { id: "img1-1", group_id: "1", title: "蟹老闆", url: "https://images.plurk.com/1fQbse3eROZ43oEkhL8RPs.jpg", order: 1, is_cover: true },
      { id: "img1-2", group_id: "1", title: "蟹笑",   url: "https://images.plurk.com/1fQbse3eROZ43oEkhL8RPs.jpg", order: 2, is_cover: false },
    ],
  },
  {
    id: "2",
    group_keyword: "足",
    group_keyword_zhuyin: "ㄗㄨˊ",
    category_main: "life",
    category_sub: "foot",
    cover_image_id: "img2-1",
    is_featured: true,
    created_at: "",
    images: [
      { id: "img2-1", group_id: "2", title: "世足",     url: "https://images.plurk.com/6kOeNcLHb8FSmihPFXYwHN.png", order: 1, is_cover: true },
      { id: "img2-2", group_id: "2", title: "生鮮世足", url: "https://images.plurk.com/3kaxijyZXLoU01iDEXT61t.png", order: 2, is_cover: false },
    ],
  },
  {
    id: "3",
    group_keyword: "起司",
    group_keyword_zhuyin: "ㄑㄧˇㄙ",
    category_main: "food",
    category_sub: "cheese",
    cover_image_id: "img3-1",
    is_featured: true,
    created_at: "",
    images: [
      { id: "img3-1", group_id: "3", title: "塊背起司",   url: "https://images.plurk.com/4xMaIVvZaPhxiNOE9XpM69.png", order: 1, is_cover: true },
      { id: "img3-2", group_id: "3", title: "長芝士了",   url: "https://images.plurk.com/76DSS2sbRCa0WIRTw07jKw.png", order: 2, is_cover: false },
      { id: "img3-3", group_id: "3", title: "不乾式酪",   url: "https://images.plurk.com/3Ki1AuK2RRFCYerPpbovmT.png", order: 3, is_cover: false },  // ← order 修正
    ],
  },
];