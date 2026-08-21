import { createClient } from './supabase/server'

export type CategoryStat = { name: string; count: number }
export type GroupStat = { keyword: string; count: number }

export type DashboardStats = {
  totalImages: number
  totalGroups: number
  totalCategories: number
  totalMessages: number
  categoryStats: CategoryStat[]
  topGroups: GroupStat[]
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient()

  const [{ data: categories }, { data: groups }, { count: totalCategories }, { count: totalMessages }] =
    await Promise.all([
      supabase.from('categories').select('id, name, parent_id'),
      supabase.from('image_groups').select('id, group_keyword, category_main, images(id)'),
      supabase.from('categories').select('*', { count: 'exact', head: true }),
      supabase.from('messages').select('*', { count: 'exact', head: true }),
    ])

  const safeGroups = groups ?? []
  const safeCategories = categories ?? []

  // 等同 SQL：
  // SELECT COALESCE(c.name, '未歸檔') AS name, COUNT(i.id) AS count
  // FROM image_groups g
  // LEFT JOIN images i ON i.group_id = g.id
  // LEFT JOIN categories c ON c.id = g.category_main
  // GROUP BY c.name
  // ORDER BY count DESC
  const mainCategoryNameById = new Map(
    safeCategories.filter(c => c.parent_id === null).map(c => [c.id, c.name])
  )
  const categoryCountMap = new Map<string, number>()
  for (const g of safeGroups) {
    const imageCount = g.images?.length ?? 0
    const name = g.category_main ? mainCategoryNameById.get(g.category_main) ?? '未知分類' : '未歸檔'
    categoryCountMap.set(name, (categoryCountMap.get(name) ?? 0) + imageCount)
  }
  const categoryStats = Array.from(categoryCountMap, ([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)

  // 等同 SQL：
  // SELECT g.group_keyword, COUNT(i.id) AS count
  // FROM image_groups g
  // JOIN images i ON i.group_id = g.id
  // GROUP BY g.id
  // ORDER BY count DESC
  // LIMIT 10
  const topGroups = [...safeGroups]
    .map(g => ({ keyword: g.group_keyword, count: g.images?.length ?? 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  const totalImages = safeGroups.reduce((sum, g) => sum + (g.images?.length ?? 0), 0)

  return {
    totalImages,
    totalGroups: safeGroups.length,
    totalCategories: totalCategories ?? 0,
    totalMessages: totalMessages ?? 0,
    categoryStats,
    topGroups,
  }
}
