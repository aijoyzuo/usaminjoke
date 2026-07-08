import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

const SITE_URL = 'https://usaminjoke.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()
  const { data: groups } = await supabase
    .from('image_groups')
    .select('id, created_at')

  const groupUrls: MetadataRoute.Sitemap = (groups ?? []).map(group => ({
    url: `${SITE_URL}/group/${group.id}`,
    lastModified: group.created_at,
  }))

  return [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/messageboard`, lastModified: new Date() },
    ...groupUrls,
  ]
}
