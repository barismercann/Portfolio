import { verifyAuth } from '@/lib/auth';
import { prisma } from '@/lib/database';
import { blogPostSchema } from '@/types/blog.types';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/blogs/[id] - Get single blog post
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    
    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({
        success: false,
        message: 'Blog yazısı bulunamadı',
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('❌ Blog post fetch error:', error);
    return NextResponse.json({
      success: false,
      message: 'Blog yazısı getirilemedi',
    }, { status: 500 });
  }
}

// PUT /api/blogs/[id] - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    // Check authentication
    const authPayload = await verifyAuth(request);
    if (!authPayload) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized',
      }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const validatedData = blogPostSchema.parse(body);

    // Check if post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json({
        success: false,
        message: 'Blog yazısı bulunamadı',
      }, { status: 404 });
    }

    // Check if slug is taken by another post
    if (validatedData.slug !== existingPost.slug) {
      const slugExists = await prisma.blogPost.findUnique({
        where: { slug: validatedData.slug },
      });

      if (slugExists && slugExists.id !== id) {
        return NextResponse.json({
          success: false,
          message: 'Bu slug başka bir yazı tarafından kullanılıyor',
        }, { status: 400 });
      }
    }

    // Prepare update data
    const updateData = {
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
      publishedAt: validatedData.status === 'PUBLISHED' && !existingPost.publishedAt 
        ? new Date() 
        : existingPost.publishedAt,
    };

    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      data: updatedPost,
      message: 'Blog yazısı başarıyla güncellendi',
    });
  } catch (error) {
    console.error('❌ Blog post update error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Geçersiz veri',
        errors: error.errors,
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      message: 'Blog yazısı güncellenemedi',
    }, { status: 500 });
  }
}

// DELETE /api/blogs/[id] - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    // Check authentication
    const authPayload = await verifyAuth(request);
    if (!authPayload) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized',
      }, { status: 401 });
    }

    const { id } = await params;

    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json({
        success: false,
        message: 'Blog yazısı bulunamadı',
      }, { status: 404 });
    }

    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Blog yazısı başarıyla silindi',
    });
  } catch (error) {
    console.error('❌ Blog post deletion error:', error);
    return NextResponse.json({
      success: false,
      message: 'Blog yazısı silinemedi',
    }, { status: 500 });
  }
}