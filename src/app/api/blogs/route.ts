import { verifyAuth } from '@/lib/auth';
import { prisma } from '@/lib/database';
import {
  blogPostSchema,
  BlogPostWhereClause
} from '@/types/blog.types';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | null;
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    

    const slug = searchParams.get('slug');
    const skip = (page - 1) * limit;

    const where: BlogPostWhereClause = {};
    
    if (status) {
      where.status = status;
    }
    
    if (category) {
      where.category = category;
    }
    
    if (slug) {
      const singlePost = await prisma.blogPost.findUnique({
        where: { 
          slug,
          status: 'PUBLISHED',
        },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          content: true,
          coverImage: true,
          metaTitle: true,
          metaDescription: true,
          keywords: true,
          status: true,
          publishedAt: true,
          readTime: true,
          viewCount: true,
          category: true,
          tags: true,
          authorName: true,
          authorEmail: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (singlePost) {
        // View count artır
        await prisma.blogPost.update({
          where: { id: singlePost.id },
          data: { viewCount: { increment: 1 } },
        });
      }

      return NextResponse.json({
        success: !!singlePost,
        data: singlePost ? {
          posts: [singlePost],
          pagination: { page: 1, limit: 1, total: 1, totalPages: 1 }
        } : {
          posts: [],
          pagination: { page: 1, limit: 1, total: 0, totalPages: 0 }
        },
        message: singlePost ? 'Blog yazısı bulundu' : 'Blog yazısı bulunamadı',
      });
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [posts, totalCount] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          content: true, // Detay sayfası için content da eklendi
          coverImage: true,
          metaTitle: true,
          metaDescription: true,
          keywords: true,
          status: true,
          publishedAt: true,
          readTime: true,
          viewCount: true,
          category: true,
          tags: true,
          authorName: true,
          authorEmail: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.blogPost.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        posts,
        pagination: {
          page,
          limit,
          total: totalCount,
          totalPages: Math.ceil(totalCount / limit),
        },
      },
    });
  } catch (error) {
    console.error('❌ Blog posts fetch error:', error);
    return NextResponse.json({
      success: false,
      message: 'Blog yazıları getirilemedi',
    }, { status: 500 });
  }
}

// POST route aynen kalıyor...
export async function POST(request: NextRequest) {
  try {
    const authPayload = await verifyAuth(request);
    if (!authPayload) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized',
      }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = blogPostSchema.parse(body);

    const existingPost = await prisma.blogPost.findUnique({
      where: { slug: validatedData.slug },
    });

    if (existingPost) {
      return NextResponse.json({
        success: false,
        message: 'Bu slug zaten kullanımda',
      }, { status: 400 });
    }

    const postData = {
      title: validatedData.title,
      slug: validatedData.slug,
      excerpt: validatedData.excerpt || null,
      content: validatedData.content,
      coverImage: validatedData.coverImage || null,
      metaTitle: validatedData.metaTitle || null,
      metaDescription: validatedData.metaDescription || null,
      keywords: validatedData.keywords,
      status: validatedData.status,
      category: validatedData.category || null,
      tags: validatedData.tags,
      readTime: validatedData.readTime || null,
      publishedAt: validatedData.status === 'PUBLISHED' ? new Date() : null,
    };

    const post = await prisma.blogPost.create({
      data: postData,
    });

    return NextResponse.json({
      success: true,
      data: post,
      message: 'Blog yazısı başarıyla oluşturuldu',
    });
  } catch (error) {
    console.error('❌ Blog post creation error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Geçersiz veri',
        errors: error.errors,
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      message: 'Blog yazısı oluşturulamadı',
    }, { status: 500 });
  }
}