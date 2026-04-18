import { Suspense } from "react";
import { getArticles, getCategories } from "@/app/lib/api";
import SearchInput, { SearchInputFallback } from "@/app/components/search-input";
import SearchArticleCard, {
  SearchResultsSkeleton,
} from "@/app/components/search-article-card";
import CategoryFilter, {
  CategoryFilterSkeleton,
} from "@/app/components/category-filter";
import SearchResultsBoundary from "@/app/components/search-results-boundary";

async function Categories() {
  const res = await getCategories().catch(() => null);
  const categories = res?.data ?? [];
  if (categories.length === 0) return null;
  return <CategoryFilter categories={categories} />;
}

function buildSearchUrl(query: string, category: string, page: number) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return `/search${qs ? `?${qs}` : ""}`;
}

type SearchParams = Promise<{
  q?: string;
  page?: string;
  category?: string;
}>;

async function SearchResults({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q, page: pageParam, category } = await searchParams;
  const query = q || "";
  const currentPage = Number(pageParam) || 1;
  const activeCategory = category || "";

  const res = await getArticles(
    currentPage,
    5,
    activeCategory || undefined,
    query || undefined
  ).catch(() => null);

  const articles = res?.data ?? [];
  const pagination = res?.meta?.pagination;

  return (
    <>
      {query && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {pagination?.total ?? 0}{" "}
          {pagination?.total === 1 ? "result" : "results"}{" "}
          for &ldquo;{query}&rdquo;
        </p>
      )}

      {articles.length > 0 ? (
        <div className="flex flex-col gap-4">
          {articles.map((article) => (
            <SearchArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-zinc-500 dark:text-zinc-400">
          No articles found. Try a different search term.
        </p>
      )}

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-4">
          {pagination.page > 1 ? (
            <a
              href={buildSearchUrl(query, activeCategory, pagination.page - 1)}
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              Previous
            </a>
          ) : (
            <span className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 opacity-40 dark:border-zinc-800 dark:text-zinc-300">
              Previous
            </span>
          )}
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          {pagination.page < pagination.totalPages ? (
            <a
              href={buildSearchUrl(query, activeCategory, pagination.page + 1)}
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              Next
            </a>
          ) : (
            <span className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 opacity-40 dark:border-zinc-800 dark:text-zinc-300">
              Next
            </span>
          )}
        </div>
      )}
    </>
  );
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-bold text-zinc-950 dark:text-zinc-50">
        Search Articles
      </h1>

      <div className="flex flex-col gap-8">
        <Suspense fallback={<SearchInputFallback />}>
          <SearchInput />
        </Suspense>

        <Suspense fallback={<CategoryFilterSkeleton />}>
          <Categories />
        </Suspense>

        <Suspense fallback={<SearchResultsSkeleton count={5} />}>
          <SearchResultsBoundary>
            <SearchResults searchParams={searchParams} />
          </SearchResultsBoundary>
        </Suspense>
      </div>
    </main>
  );
}
