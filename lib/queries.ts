import { supabase } from './supabase/server'
import { MemeGroup } from '@/types'

export async function getAllGroups(): Promise<MemeGroup[]> {
  const { data, error } = await supabase
    .from('image_groups')
    .select(`
      *,
      images (*)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  // images 按 order 排序
  return data.map(group => ({
    ...group,
    images: group.images?.sort((a: any, b: any) => a.order - b.order)
  }))
}