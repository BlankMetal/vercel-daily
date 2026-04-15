"use client";

import { useSubscription } from "./subscription-provider";

export default function SubscribeButton() {
  const { subscription, isLoading, pending, subscribe, deactivate } =
    useSubscription();

  if (isLoading) {
    return (
      <div className="h-8 w-24 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
    );
  }

  if (!subscription || subscription.status === "inactive") {
    return (
      <button
        onClick={subscribe}
        disabled={pending !== null}
        className="rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {pending === "subscribe" ? "Subscribing..." : "Subscribe"}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
        Subscribed
      </span>
      <button
        onClick={deactivate}
        disabled={pending !== null}
        className="rounded-full border border-zinc-300 px-3 py-1 text-xs text-zinc-500 transition-colors hover:border-red-300 hover:text-red-600 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-500 dark:hover:border-red-700 dark:hover:text-red-400"
      >
        {pending === "unsubscribe" ? "..." : "Unsubscribe"}
      </button>
    </div>
  );
}
