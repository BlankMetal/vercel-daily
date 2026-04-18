# Vercel Daily

A news and insights platform for developers, built with Next.js 16 and React 19. Features a curated feed of tech articles, breaking news, search with category filtering, and a subscription gate for premium content.

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment variables

Create a `.env.local` with:

```
NEXT_PUBLIC_SITE_URL=<api-base-url>
API_TOKEN=<api-bearer-token>
```

`NEXT_PUBLIC_VERCEL_URL` is used automatically as a fallback on Vercel deployments.

## Project Structure

```
app/
├── page.tsx                  # Homepage: breaking news + latest articles
├── search/page.tsx           # Search + category filter + pagination
├── articles/[slug]/page.tsx  # Article detail with subscription gate
├── components/               # Shared UI (cards, skeletons, banners, gate)
└── lib/                      # API client, models, subscription helpers
```

## Design Decisions

These are the intentional choices made while building this app, along with their trade offs.

### Breaking news as an overlay, not a reserved slot

Breaking news isn't always present. Rather than reserving vertical space that collapses when empty (causing layout shift) or sits awkwardly blank, the `BreakingNewsBanner` renders as an overlay at the top of the page and animates in with a `slide-down` transition. This keeps the layout stable when there's no breaking news and makes the banner feel like a genuine alert when it appears.

### Urgent vs. non-urgent styling

Breaking news items carry an `urgent` flag. When `true`, the banner uses red accents to show severity. When `false`, it falls back to a neutral gray treatment.

### Inline links rendered from article content

The raw article content contained URLs that were rendering as plain text. Article bodies now parse and render those URLs as proper links.

### Shared `ArticleCard` and skeleton components

The article card, its skeleton, and related loading states are extracted into shared components so the homepage, search results, and related-article lists all use the same presentation. Changes to card styling or loading behavior only need to happen in one place.

### No `cacheTags` on fetches

The data cache uses `cacheLife()` profiles tuned per content type (breaking news, articles, config). I did not include `cacheTags` because content never needs to be manually invalidated.

### Client-side subscription gate (noted risk)

The `ArticleGate` hides full article content on the **client** based on subscription state. A server-side gate was considered but would have significantly complicated caching and rendering.

**The trade-off:** a determined user could inspect the DOM via devtools and read the full article without subscribing, since the full content is present in the HTML and merely hidden by the client component. This is a known, accepted risk.

