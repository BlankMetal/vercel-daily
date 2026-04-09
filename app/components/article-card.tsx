import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/app/lib/models";

export function ArticleCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="aspect-[16/9] animate-pulse bg-zinc-200 dark:bg-zinc-800" />
      <div className="flex flex-col gap-2 p-5">
        <div className="h-3 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-5 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-3 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}

export function ArticleGridSkeleton({ count = 6, className = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" }: { count?: number; className?: string } = {}) {
  return (
    <div className={className}>
      {Array.from({ length: count }, (_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ArticleErrorCard() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex items-center justify-center rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600 sm:col-span-2 lg:col-span-3 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
        Article information could not be fetched right now. Please try again later.
      </div>
    </div>
  );
}

export default function ArticleCard({ article }: { article: Article }) {
  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/articles/${article.id}`}
      className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col gap-2 p-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {article.category}
        </span>
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-zinc-950 group-hover:text-zinc-700 dark:text-zinc-50 dark:group-hover:text-zinc-300">
          {article.title}
        </h3>
        <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
          {article.excerpt}
        </p>
        <time
          dateTime={article.publishedAt}
          className="text-sm text-zinc-500 dark:text-zinc-400"
        >
          {date}
        </time>
      </div>
    </Link>
  );
}
