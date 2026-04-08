import Link from "next/link";
import { Suspense } from "react";
import ArticleCard from "./components/article-card";
import BreakingNewsBanner from "./components/breaking-news-banner";
import { getArticles, getBreakingNews } from "./lib/api";

function ArticleCardSkeleton() {
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

function ArticleGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}

function ArticleErrorCard() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex items-center justify-center rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600 sm:col-span-2 lg:col-span-3 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
        Article information could not be fetched right now. Please try again later.
      </div>
    </div>
  );
}

async function ArticleGrid() {
  const res = await getArticles(1, 6).catch(() => null);
  if (!res?.data) return <ArticleErrorCard />;
  if (!res.data.length) return null;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {res.data.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

async function BreakingNews() {
  const res = await getBreakingNews().catch(() => null);
  if (!res?.data) return null;
  return <BreakingNewsBanner article={res.data} />;
}

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col">
      <div className="absolute inset-x-0 top-0 z-10">
        <Suspense fallback={null}>
          <BreakingNews />
        </Suspense>
      </div>
      <main className="flex flex-col items-center justify-center gap-8 px-6 py-32 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-6xl">
          Vercel Daily
        </h1>
        <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
          News and insights for modern developers
        </p>
        <div className="flex gap-4">
          <Link
            href="/subscribe"
            className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Subscribe
          </Link>
          <Link
            href="/articles"
            className="rounded-full border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            Browse Articles
          </Link>
        </div>
      </main>
      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <h2 className="mb-8 text-2xl font-bold text-zinc-950 dark:text-zinc-50">
          Latest Articles
        </h2>
        <Suspense fallback={<ArticleGridSkeleton />}>
          <ArticleGrid />
        </Suspense>
      </section>
    </div>
  );
}
