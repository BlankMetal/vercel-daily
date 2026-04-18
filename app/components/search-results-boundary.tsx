"use client";

import { Suspense, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { SearchResultsSkeleton } from "./search-article-card";

export default function SearchResultsBoundary({
  children,
}: {
  children: ReactNode;
}) {
  const searchParams = useSearchParams();
  return (
    <Suspense
      key={searchParams.toString()}
      fallback={<SearchResultsSkeleton count={5} />}
    >
      {children}
    </Suspense>
  );
}
