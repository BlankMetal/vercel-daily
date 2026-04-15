import Link from "next/link";
import Image from "next/image";
import SubscribeButton from "./subscribe-button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-12 border-b border-black/[.08] bg-white px-6 dark:border-white/[.145] dark:bg-black">
      <div className="mx-auto flex h-full max-w-6xl items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            className="invert dark:invert-0"
            src="/vercel.svg"
            alt="Vercel logo"
            width={20}
            height={5}
            priority
          />
          <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            Vercel Daily
          </span>
        </Link>
        <nav className="flex gap-5 text-sm font-medium">
          <Link
            href="/"
            className="text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Home
          </Link>
          <Link
            href="/search"
            className="text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Search
          </Link>
        </nav>
        <div className="ml-auto">
          <SubscribeButton />
        </div>
      </div>
    </header>
  );
}
