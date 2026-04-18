"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchInputFallback() {
  return (
    <div className="flex gap-3">
      <div className="h-11 flex-1 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950" />
      <div className="h-11 w-[84px] rounded-lg bg-zinc-900 dark:bg-zinc-100" />
    </div>
  );
}

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const navigate = useCallback(
    (q: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const trimmed = q.trim();
      if (trimmed) params.set("q", trimmed);
      else params.delete("q");
      params.delete("page");
      const qs = params.toString();
      router.push(`/search${qs ? `?${qs}` : ""}`);
    },
    [router, searchParams]
  );

  const handleChange = useCallback(
    (value: string) => {
      setQuery(value);

      if (debounceRef.current) clearTimeout(debounceRef.current);

      if (value.trim().length >= 3 || value.trim().length === 0) {
        debounceRef.current = setTimeout(() => {
          navigate(value);
        }, 300);
      }
    },
    [navigate]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (debounceRef.current) clearTimeout(debounceRef.current);
      navigate(query);
    },
    [query, navigate]
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search articles..."
        className="flex-1 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-950 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-zinc-600"
        autoFocus
      />
      <button
        type="submit"
        className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Search
      </button>
    </form>
  );
}
