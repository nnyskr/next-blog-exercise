"use client";
import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Category } from "@/types";

export default function Filters({
  categories,
  currentActiveCategories,
}: {
  categories: Category[];
  currentActiveCategories: Category["name"][];
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [activeCategoriesByName, setActiveCategoriesByName] = useState<
    Record<string, boolean>
  >(
    currentActiveCategories.reduce((result, next) => {
      result[next] = true;
      return result;
    }, {} as Record<string, boolean>)
  );

  const [isPending, startTransition] = useTransition();

  function onCategoryClick(name: string) {
    const newActiveCategoriesByName = {
      ...activeCategoriesByName,
      [name]: !activeCategoriesByName[name],
    };
    setActiveCategoriesByName(newActiveCategoriesByName);

    const searchParams = new URLSearchParams(window.location.search);

    const categoriesParam = Object.keys(newActiveCategoriesByName)
      .filter((key) => newActiveCategoriesByName[key])
      .join(",");

    if (categoriesParam) {
      searchParams.set("categories", categoriesParam);
    } else {
      searchParams.delete("categories");
    }

    searchParams.delete("page");

    startTransition(() => {
      router.replace(`${pathname}?${searchParams.toString()}`);
    });
  }

  return (
    <div className="flex flex-wrap gap-2 px-8 mt-8 items-center">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => onCategoryClick(category.name)}
          className={`p-2 rounded cursor-pointer border ${
            activeCategoriesByName[category.name] ? "bg-sky-500" : ""
          }`}
        >
          {category.name}
        </div>
      ))}
      {isPending && <div className={"animate-spin"}>🔄</div>}
    </div>
  );
}
