import { supabase } from "@/lib/supabase";
import GroupClient from "./GroupClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function GroupPage({ params }: Props) {
  const { id } = await params;

  const { data: group, error } = await supabase
    .from('image_groups')
    .select(`*, images (*)`)
    .eq('id', id)
    .single();

  if (error || !group) return <div>找不到資料</div>;

  // images 按 order 排序
  group.images = group.images?.sort((a: any, b: any) => a.order - b.order);

  return <GroupClient group={group} />;
}