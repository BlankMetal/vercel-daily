"use client";

import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Category } from "@/app/lib/models";

export function CategoryFilterSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-9 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800"
          style={{ width: `${72 + ((i * 23) % 40)}px` }}
        />
      ))}
    </div>
  );
}

export default function CategoryFilter({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") || "";

  const handleClick = useCallback(
    (slug: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (slug === activeCategory) {
        params.delete("category");
      } else {
        params.set("category", slug);
      }
      params.delete("page");
      const qs = params.toString();
      router.push(`${pathname}${qs ? `?${qs}` : ""}`);
    },
    [router, pathname, searchParams, activeCategory]
  );

  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = cat.slug === activeCategory;
        return (
          <button
            key={cat.slug}
            onClick={() => handleClick(cat.slug)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-800"
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
