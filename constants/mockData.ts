// constants/mockData.ts
import { MemeGroup } from "@/types";

export const mockGroups: MemeGroup[] = [
  {
    id: "1",
    group_keyword: "鼠",
    group_keyword_zhuyin: "ㄕㄨˇ",
    category_main: "animal",
    category_sub: "crab",
    cover_image_id: "img1-1",
    is_featured: true,
    created_at: "",
    images: [
      { id: "img1-1", group_id: "1", title: "笑鼠", url: "https://images.plurk.com/2gnd2P6kqYUIP6YJuPBpDJ.jpg", order: 1, is_cover: true },
      { id: "img1-2", group_id: "1", title: "氣鼠", url: "https://images.plurk.com/1WiMO8GIViPuSvJomkjVDH.jpg", order: 2, is_cover: false },
      { id: "img1-3", group_id: "1", title: "家鼠答禮", url: "https://images.plurk.com/6DCdDGpyMr8frBL9Nc0hVz.jpg", order: 3, is_cover: false },
      { id: "img1-4", group_id: "1", title: "哈根大鼠", url: "https://images.plurk.com/5CT6odV9237lc5rgrI0SUc.jpg", order: 4, is_cover: false },
      { id: "img1-5", group_id: "1", title: "やば鼠ぎ", url: "https://images.plurk.com/cKjBsoFSAaTjavclYiYFt.png", order: 5, is_cover: false },
      { id: "img1-6", group_id: "1", title: "摳鼠洞", url: "https://images.plurk.com/5qaiXPrnt0C6PVNxHvbg1i.gif", order: 6, is_cover: false },
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
      { id: "img2-1", group_id: "2", title: "世足", url: "https://images.plurk.com/6kOeNcLHb8FSmihPFXYwHN.png", order: 1, is_cover: true },
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
      { id: "img3-1", group_id: "3", title: "塊背起司", url: "https://images.plurk.com/4xMaIVvZaPhxiNOE9XpM69.png", order: 1, is_cover: true },
      { id: "img3-2", group_id: "3", title: "長芝士了", url: "https://images.plurk.com/76DSS2sbRCa0WIRTw07jKw.png", order: 2, is_cover: false },
      { id: "img3-3", group_id: "3", title: "不乾式酪", url: "https://images.plurk.com/3Ki1AuK2RRFCYerPpbovmT.png", order: 3, is_cover: false },  // ← order 修正
    ],
  },
    {
    id: "4",
    group_keyword: "狼",
    group_keyword_zhuyin: "ㄌㄤˊ",
    category_main: "animal",
    category_sub: "wolf",
    cover_image_id: "img4-1",
    is_featured: true,
    created_at: "",
    images: [
      { id: "img4-1", group_id: "4", title: "狼琅上口", url: "https://images.plurk.com/cQGho6pONdKb6x9bxYdoP.png", order: 1, is_cover: true },
      { id: "img4-2", group_id: "4", title: "午狼抵EMO", url: "https://images.plurk.com/1DyI6n8tbeWHQWW3UXlNeM.png", order: 2, is_cover: false },
      { id: "img4-3", group_id: "4", title: "GO狼玩", url: "https://images.plurk.com/3nettowoxTLwmpgb6g4dMm.png", order: 3, is_cover: false },
      { id: "img4-4", group_id: "4", title: "狼SINGLE吠", url: "https://images.plurk.com/4XbgQXkglZcQsmEEJj30X7.png", order: 4, is_cover: false },     
    ],
  },
];