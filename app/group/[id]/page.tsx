import { Suspense } from 'react';
import { cache } from 'react';
import type { Metadata } from 'next';
import { createClient } from "@/lib/supabase/server";
import GroupClient from "./GroupClient";
import type { MemeGroup, MemeImage } from '@/types';

type Props = {
  params: Promise<{ id: string }>;
};

const SITE_URL = 'https://usaminjoke.vercel.app';

const getGroup = cache(async (id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('image_groups')
    .select(`*, images (*)`)
    .eq('id', id)
    .single();

  return { group: data as MemeGroup | null, error };
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { group } = await getGroup(id);

  if (!group) {
    return { title: '找不到資料' };
  }

  const cover = group.images?.find(img => img.is_cover) ?? group.images?.[0];
  const title = group.group_keyword;
  const description = `「${group.group_keyword}」的諧音梗圖，共 ${group.images?.length ?? 0} 張圖`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/group/${id}`,
      images: cover ? [{ url: cover.url, width: 1200, height: 630, alt: title }] : undefined,
    },
  };
}

export default async function GroupPage({ params }: Props) {
  const { id } = await params;
  const { group, error } = await getGroup(id);

  if (error || !group) return <div>找不到資料</div>;
  group.images = group.images?.sort((a: MemeImage, b: MemeImage) => a.order - b.order);

  return (
    <Suspense>
      <GroupClient group={group} />
    </Suspense>
  );
}
