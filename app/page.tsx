import Link from "next/link";
import { Suspense } from "react";
import ArticleCard, { ArticleGridSkeleton, ArticleErrorCard } from "./components/article-card";
import BreakingNewsBanner from "./components/breaking-news-banner";
import { getArticles, getBreakingNews } from "./lib/api";


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
        <Link
          href="/search"
          className="rounded-full border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-900"
        >
          Browse Articles
        </Link>
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
