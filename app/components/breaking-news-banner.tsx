import Link from "next/link";
import type { BreakingNewsArticle } from "@/app/lib/models";

export default function BreakingNewsBanner({
  article,
}: {
  article: BreakingNewsArticle;
}) {
  return (
    <div
      className={`animate-slide-down border-b px-6 py-3 ${
        article.urgent
          ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950"
          : "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
      }`}
    >
      <div className="mx-auto flex max-w-4xl items-center gap-3">
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white ${
            article.urgent ? "bg-red-600" : "bg-zinc-600"
          }`}
        >
          Breaking
        </span>
        <p
          className={`min-w-0 flex-1 truncate text-sm font-medium ${
            article.urgent
              ? "text-red-900 dark:text-red-100"
              : "text-zinc-900 dark:text-zinc-100"
          }`}
        >
          {article.headline}
        </p>
        <Link
          href={`/articles/${article.articleId}`}
          className={`shrink-0 text-sm font-medium underline-offset-2 hover:underline ${
            article.urgent
              ? "text-red-700 dark:text-red-300"
              : "text-zinc-700 dark:text-zinc-300"
          }`}
        >
          Read more
        </Link>
      </div>
    </div>
  );
}
