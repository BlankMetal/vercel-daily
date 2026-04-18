"use client";

import { useSubscription } from "./subscription-provider";

export default function ArticlePaywall() {
  const { pending, subscribe } = useSubscription();

  return (
    <div className="mt-8 flex flex-col items-center rounded-xl border border-zinc-200 bg-white px-6 py-12 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-400">
        Subscriber only
      </div>
      <h3 className="mb-2 text-xl font-bold text-zinc-950 dark:text-zinc-50">
        Subscribe to keep reading
      </h3>
      <p className="mb-6 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
        Get unlimited access to all articles and exclusive content.
      </p>
      <button
        onClick={subscribe}
        disabled={pending !== null}
        className="rounded-full bg-zinc-950 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
      >
        {pending === "subscribe" ? "Subscribing..." : "Subscribe"}
      </button>
    </div>
  );
}
