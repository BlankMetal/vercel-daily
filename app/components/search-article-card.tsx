import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/app/lib/models";

export function SearchArticleCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white sm:flex-row sm:gap-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="aspect-[2/1] w-full shrink-0 animate-pulse bg-zinc-200 sm:aspect-[3/2] sm:w-56 dark:bg-zinc-800" />
      <div className="flex flex-1 flex-col justify-center gap-2 p-4 sm:py-4 sm:pr-4 sm:pl-0">
        <div className="h-3 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="flex gap-3">
          <div className="h-3 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-3 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}

export function SearchResultsSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }, (_, i) => (
        <SearchArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function SearchArticleCard({ article }: { article: Article }) {
  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/articles/${article.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-colors hover:border-zinc-300 sm:flex-row sm:gap-4 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
    >
      <div className="relative aspect-[2/1] w-full shrink-0 overflow-hidden bg-zinc-100 sm:aspect-[3/2] sm:w-56 dark:bg-zinc-900">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 224px"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-1.5 p-4 sm:py-4 sm:pr-4 sm:pl-0">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {article.category}
        </span>
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-zinc-950 group-hover:text-zinc-700 sm:text-lg dark:text-zinc-50 dark:group-hover:text-zinc-300">
          {article.title}
        </h3>
        <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <span>{article.author.name}</span>
          <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          <time dateTime={article.publishedAt}>{date}</time>
          {article.tags.length > 0 && (
            <>
              <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <span className="line-clamp-1">{article.tags.slice(0, 2).join(", ")}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
