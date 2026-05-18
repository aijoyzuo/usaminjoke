import { Suspense } from 'react';
import { getAllGroups } from '@/lib/queries';
import HomeClient from './HomeClient';

export default async function Home() {
  const groups = await getAllGroups();
  return (
    <Suspense>
      <HomeClient groups={groups} />
    </Suspense>
  );
}