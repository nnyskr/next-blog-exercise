import Image from 'next/image';
import prisma from '@/lib/prisma';

// Prisma does not support Edge without the Data Proxy currently
// export const runtime = 'edge'
export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await prisma.posts.findUnique({
    where: {
      slug: params.slug,
    },
  });

  const categories = await prisma.categories.findMany({
    where: {
      categoryId: {
        in: post?.categories.map((categoryId) => `${categoryId}`),
      },
    },
  });

  if (!post) {
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        Could not load post
      </h1>
    </main>;
  }

  return (
    <main className="flex min-h-screen m-auto flex-col items-center w-full py-8">
      <Image
        src={post?.imageUrl || ''}
        alt={post?.title || ''}
        width={800}
        height={600}
      />

      <h1 className="pt-4 pb-8 text-center text-4xl font-medium tracking-tight md:text-7xl">
        {post?.title}
      </h1>
      <p>{post?.excerpt}</p>
      <p>
        Categories:{' '}
        {categories.map((category) => `${category.name}`).join(', ')}
      </p>
    </main>
  );
}
