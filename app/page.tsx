import { Suspense } from 'react';
import Posts from '@/components/posts';
import Search from '@/components/search';
import Filters from '@/components/filters';
import { SearchParams } from '@/types';

// Prisma does not support Edge without the Data Proxy currently
// export const runtime = 'edge'
export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="pt-4 pb-8 text-center text-4xl font-medium tracking-tight md:text-7xl">
        Blog
      </h1>
      <Search defaultValue={searchParams.title} />
      <Suspense fallback={<div>filters...</div>}>
        <Filters searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<div>posts...</div>}>
        <Posts searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
