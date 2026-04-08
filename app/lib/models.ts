export interface BreakingNewsArticle {
  id: string;
  headline: string;
  summary: string;
  articleId: string;
  category: string;
  publishedAt: string;
  urgent: boolean;
}

export interface BreakingNewsResponse {
  success: boolean;
  data: BreakingNewsArticle;
}
