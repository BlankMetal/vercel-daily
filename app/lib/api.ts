import type { ArticleDetailResponse, ArticlesResponse, BreakingNewsResponse } from "./models";

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
  return fetchFromAPI("/breaking-news");
}

export async function getArticles(
  page: number = 1,
  limit: number = 20
): Promise<ArticlesResponse> {
  return fetchFromAPI(`/articles?page=${page}&limit=${limit}`);
}

export async function getArticleDetails(
  articleId: string
): Promise<ArticleDetailResponse> {
  return fetchFromAPI(`/articles/${articleId}`);
}
