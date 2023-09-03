import prisma from '@/lib/prisma';
import Link from 'next/link';
import Post from './post-item';
import { SearchParams } from '@/types';

export default async function Posts({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const page = Number(searchParams.page || 1);
  const title = searchParams.title || '';
  const activeCategories = (searchParams.categories || '').split(',');

  const itemsPerPage = 6;
  const skip = (page - 1) * itemsPerPage;

  const categories = await prisma.categories.findMany({});
  const activeCategoriesIds = categories
    .filter((category) => activeCategories.includes(category.name))
    .map((category) => Number(category.categoryId));

  const posts = await prisma.posts.findMany({
    skip,
    take: itemsPerPage + 1,
    where: {
      title: {
        contains: title,
        mode: 'insensitive',
      },
      categories: {
        hasEvery: activeCategoriesIds,
      },
    },
  });

  const hasPrevPage = !!skip;
  const hasNextPage = posts.length > itemsPerPage;
  if (hasNextPage) {
    posts.pop();
  }

  if (!posts.length) {
    return <h2 className="text-2xl p-12 text-center">No results</h2>;
  }

  return (
    <>
      <div className="grid p-8 gap-8 w-full grid-cols-1 md:grid-cols-2 md:p-12 lg:p-18 2xl:grid-cols-3 2xl:w-60vw 2xl:p-24 gap-12">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
      <div className="flex justify-between p-12 space-x-5 pt-10 border-t border-gray-300 w-full max-w-xxl text-gray-600">
        <Link
          href={{
            pathname: '/',
            query: {
              ...searchParams,
              page: page - 1,
            },
          }}
          className={`font-medium underline underline-offset-4 hover:text-black transition-colors ${
            hasPrevPage ? '' : 'invisible'
          }`}
        >
          Previous page
        </Link>
        <Link
          href={{
            pathname: '/',
            query: {
              ...searchParams,
              page: page + 1,
            },
          }}
          className={`font-medium underline underline-offset-4 hover:text-black transition-colors ${
            hasNextPage ? '' : 'invisible'
          }`}
        >
          Next page
        </Link>
      </div>
    </>
  );
}
