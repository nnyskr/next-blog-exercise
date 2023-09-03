import prisma from "@/lib/prisma";
import FiltersChips from "@/components/filters-chips";
import { SearchParams } from "@/types";

export default async function Filters({
  searchParams,
}: {
  searchParams: Pick<SearchParams, "categories">;
}) {
  const categories = await prisma.categories.findMany({});
  const currentActiveCategories = searchParams.categories?.split(",") || [];

  return (
    <FiltersChips
      categories={categories}
      currentActiveCategories={currentActiveCategories}
    />
  );
}
