// constants/categories.ts
import { Category } from "@/types"

export const categories: Category[] = [
  {
    id: 'animal', name: '動物',
    children: [
      { id: 'dog',  name: '狗' },
      { id: 'cat',  name: '貓' },
      { id: 'crab', name: '蟹' },
    ]
  },
  {
    id: 'food', name: '食物',
    children: [
      { id: 'cheese', name: '起司' },
      { id: 'bun',    name: '包子' },
      { id: 'fruit',  name: '水果' },
    ]
  },
  {
    id: 'life', name: '生活',
    children: [
      { id: 'foot', name: '足' },
    ]
  },
  { id: 'tool',      name: '用品' },
  { id: 'salaryman', name: '社畜' },
  { id: 'music',     name: '音樂' },
  {
    id: 'animation', name: '動畫',
    children: [
      { id: 'eva',  name: 'EVA' },
      { id: 'mygo', name: 'Mygo' },
      { id: 'aot',  name: '進擊的巨人' },
    ]
  },
]