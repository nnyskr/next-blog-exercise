import prisma from "../lib/prisma";
import posts from "../data/posts.json";
import categories from "../data/categories.json";

async function main() {
  const postsUpserts = posts.map((post) =>
    prisma.posts.upsert({
      where: { postId: `${post.id}` },
      update: {},
      create: {
        title: post.title,
        excerpt: post.excerpt,
        imageUrl: post.imageUrl,
        slug: post.slug,
        categories: post.categories,
        postId: `${post.id}`,
      },
    })
  );

  const categoriesUpserts = categories.map((category) =>
    prisma.categories.upsert({
      where: { categoryId: `${category.id}` },
      update: {},
      create: {
        name: category.name,
        slug: category.slug,
        categoryId: `${category.id}`,
      },
    })
  );

  const response = await Promise.all([...postsUpserts, ...categoriesUpserts]);
  console.log(response);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
