export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: { type: string; text: string }[];
  category: string;
  author: { name: string; avatar: string };
  image: string;
  publishedAt: string;
  featured: boolean;
  tags: string[];
}

export interface ArticlesResponse {
  success: boolean;
  data: Article[];
  meta: {
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

export interface ArticleDetailResponse {
  success: boolean;
  data: Article;
}

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
