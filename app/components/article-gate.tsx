"use client";

import { useSubscription } from "./subscription-provider";
import ArticlePaywall from "./article-paywall";

function renderInlineLinks(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      return (
        <a
          key={i}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {match[1]}
        </a>
      );
    }
    return part;
  });
}

export default function ArticleGate({
  paragraphs,
}: {
  paragraphs: string[];
}) {
  const { subscription, isLoading } = useSubscription();
  const isSubscribed = subscription?.status === "active";
  const visible = isSubscribed ? paragraphs : paragraphs.slice(0, 1);

  return (
    <>
      <div className="space-y-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
        {visible.map((text, i) => (
          <p key={i}>{renderInlineLinks(text)}</p>
        ))}
      </div>
      {!isLoading && !isSubscribed && <ArticlePaywall />}
    </>
  );
}
