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

export interface TrendingArticlesResponse {
  success: boolean;
  data: Article[];
}

export interface Category {
  slug: string;
  name: string;
  articleCount: number;
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
}

export interface Subscription {
  token: string;
  status: "active" | "inactive";
  subscribedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionResponse {
  success: boolean;
  data: Subscription;
}

export interface PublicationConfig {
  publicationName: string;
  language: string;
  features: {
    newsletter: boolean;
    bookmarks: boolean;
    comments: boolean;
    darkMode: boolean;
    searchSuggestions: boolean;
  };
  socialLinks: {
    twitter: string;
    github: string;
    discord: string;
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
  };
}

export interface PublicationConfigResponse {
  success: boolean;
  data: PublicationConfig;
}