import { z } from 'zod';

// Blog post schema for validation
export const blogPostSchema = z.object({
  title: z.string().min(1, 'Başlık gerekli').max(200, 'Başlık 200 karakteri geçemez'),
  slug: z.string()
    .min(1, 'Slug gerekli')
    .max(100, 'Slug 100 karakteri geçemez')
    .regex(/^[a-z0-9-]+$/, 'Slug sadece küçük harf, rakam ve tire içerebilir'),
  excerpt: z.string()
    .max(300, 'Özet 300 karakteri geçemez')
    .optional(),
  content: z.string()
    .min(50, 'İçerik en az 50 karakter olmalı')
    .max(50000, 'İçerik 50.000 karakteri geçemez'),
  coverImage: z.string()
    .url('Geçerli bir URL giriniz')
    .optional()
    .or(z.literal('')),
  metaTitle: z.string()
    .max(70, 'Meta başlık 70 karakteri geçmemeli')
    .optional(),
  metaDescription: z.string()
    .max(160, 'Meta açıklama 160 karakteri geçmemeli')
    .optional(),
  keywords: z.array(z.string()).default([]),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  category: z.string()
    .max(50, 'Kategori 50 karakteri geçemez')
    .optional(),
  tags: z.array(z.string()).default([]),
  readTime: z.number().optional(),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  category?: string;
  tags: string[];
  readTime?: number;
  viewCount: number;
  publishedAt?: Date;
  authorName: string;
  authorEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPostListItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  publishedAt?: Date;
  readTime?: number;
  viewCount: number;
  category?: string;
  tags: string[];
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPostsResponse {
  success: boolean;
  data: {
    posts: BlogPostListItem[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface BlogPostResponse {
  success: boolean;
  data?: BlogPost;
  message?: string;
}

// Search and filter types
export interface BlogSearchParams {
  page?: string;
  limit?: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  category?: string;
  search?: string;
}

// Prisma where clause types
export interface BlogPostWhereClause {
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  category?: string;
  OR?: Array<{
    title?: { contains: string; mode: 'insensitive' };
    content?: { contains: string; mode: 'insensitive' };
    excerpt?: { contains: string; mode: 'insensitive' };
  }>;
}