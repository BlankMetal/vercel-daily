import type { Metadata } from 'next';
import ArticleCard, { ArticleErrorCard, ArticleGridSkeleton } from '@/app/components/article-card';
import ArticleGate from '@/app/components/article-gate';
import { getArticleDetails, getArticles, getTrendingArticles } from '@/app/lib/api';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await getArticles(1, 20);
  return data?.map((article) => ({ slug: article.id })) ?? [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: article } = await getArticleDetails(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags.join(', '),
    authors: [{ name: article.author.name }],
    alternates: {
      canonical: `/articles/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}


function ArticleSkeleton() {
    return (
        <div className="w-full animate-pulse">
            <header className="mb-8">
                <div className="h-4 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="mt-3 h-9 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="mt-2 h-9 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="mt-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-4 w-28 rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
            </header>

            <div className="mx-auto mb-8 aspect-[16/9] max-w-2xl rounded-xl bg-zinc-200 dark:bg-zinc-800" />

            <div className="space-y-3">
                <div className="h-5 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-5 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-5 w-11/12 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="mt-4 h-5 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-5 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-5 w-10/12 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="mt-4 h-5 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-5 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-5 w-9/12 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
        </div>
    );
}

async function ArticleContent({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const { data: article } = await getArticleDetails(slug);

    if (!article) {
        notFound();
    }

    const paragraphs = article.content
        .filter((b) => b.type === "paragraph")
        .map((b) => b.text);

    const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <article>
            <header className="mb-8">
                <span className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {article.category}
                </span>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
                    {article.title}
                </h1>
                <div className="mt-4 flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                    {article.author.avatar && (
                        <Image
                            src={article.author.avatar}
                            alt={article.author.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                    )}
                    <span>{article.author.name}</span>
                    <span aria-hidden="true">&middot;</span>
                    <time dateTime={article.publishedAt}>{date}</time>
                </div>
            </header>

            <div className="relative mx-auto mb-8 aspect-[16/9] max-w-2xl overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 672px) 100vw, 672px"
                    priority
                />
            </div>

            <ArticleGate paragraphs={paragraphs} />
        </article>
    );
}

async function TrendingArticles({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: excludeId } = await params;
  const res = await getTrendingArticles([excludeId]).catch(() => null);
  if (!res?.data) return <ArticleErrorCard />;
  if (!res?.data?.length) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {res.data.slice(0, 4).map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-8">
      <Suspense fallback={<ArticleSkeleton />}>
        <ArticleContent params={params} />
      </Suspense>

      <section className="mt-16 border-t border-zinc-200 pt-12 dark:border-zinc-800">
        <h2 className="mb-8 text-2xl font-bold text-zinc-950 dark:text-zinc-50">
          Trending Articles
        </h2>
        <Suspense fallback={<ArticleGridSkeleton count={4} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" />}>
          <TrendingArticles params={params} />
        </Suspense>
      </section>
    </main>
  );
}