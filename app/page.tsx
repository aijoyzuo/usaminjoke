import { getAllGroups } from '@/lib/queries'
import HomeClient from './HomeClient'

export default async function Home() {
  const groups = await getAllGroups()
  return <HomeClient groups={groups} />
}