import { cacheLife } from "next/cache";
import type { ArticleDetailResponse, ArticlesResponse, BreakingNewsResponse, CategoriesResponse, PublicationConfigResponse, TrendingArticlesResponse } from "./models";

const API_TOKEN = process.env.API_TOKEN;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function fetchFromAPI(path: string, options?: RequestInit) {
  const url = `${SITE_URL}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "x-vercel-protection-bypass": API_TOKEN || "",
      ...options?.headers,
    },
  });

  return response.json();
}

export async function getBreakingNews(): Promise<BreakingNewsResponse> {
  "use cache";
  cacheLife("breaking");
  return fetchFromAPI("/breaking-news");
}

export async function getArticles(
  page: number = 1,
  limit: number = 20,
  category?: string,
  search?: string,
  featured?: boolean
): Promise<ArticlesResponse> {
  "use cache";
  cacheLife("articles");

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (category) params.set("category", category);
  if (search) params.set("search", search);
  if (featured != null) params.set("featured", String(featured));

  return fetchFromAPI(`/articles?${params}`);
}

export async function getArticleDetails(
  articleId: string
): Promise<ArticleDetailResponse> {
  "use cache";
  cacheLife("articles");
  return fetchFromAPI(`/articles/${articleId}`);
}

export async function getTrendingArticles(exclusionIds: string[]): Promise<TrendingArticlesResponse> {
  "use cache";
  cacheLife("articles");
  return fetchFromAPI(`/articles/trending?exclude=${exclusionIds.join(",")}`);
}

export async function getCategories(): Promise<CategoriesResponse> {
  "use cache";
  cacheLife("max");
  return fetchFromAPI("/categories");
}

export async function getPublicationConfig(): Promise<PublicationConfigResponse> {
  "use cache";
  cacheLife("max");
  return fetchFromAPI("/publication/config");
}