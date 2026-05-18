import { mockGroups } from "@/constants/mockData";
import GroupClient from "./GroupClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function GroupPage({ params }: Props) {
  const { id } = await params;

  const group = mockGroups.find(g => g.id === id);

  if (!group) return <div>找不到資料</div>;

  return <GroupClient group={group} />;
}