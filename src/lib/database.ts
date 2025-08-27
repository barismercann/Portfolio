import type {
  BudgetRange,
  MessagePriority,
  MessageStatus,
  ProjectType
} from '@prisma/client';
import { Prisma, PrismaClient } from '@prisma/client';

// Global Prisma instance to prevent connection issues
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Types
interface ContactMessageData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  budget?: string;
  projectType: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
}

interface GetContactMessagesParams {
  page?: number;
  limit?: number;
  status?: MessageStatus;
  priority?: MessagePriority;
}

interface SessionInfo {
  sessionId?: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
}

interface WhereClause {
  status?: MessageStatus;
  priority?: MessagePriority;
}

// Contact Message Functions
export async function saveContactMessage(data: ContactMessageData) {
  try {
    // Convert enum values
    const budgetEnum = convertBudgetToEnum(data.budget);
    const projectTypeEnum = convertProjectTypeToEnum(data.projectType);
    
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        budget: budgetEnum,
        projectType: projectTypeEnum,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        referrer: data.referrer,
      },
    });
    
    console.log('✅ Contact message saved to database:', contactMessage.id);
    return contactMessage;
  } catch (error) {
    console.error('❌ Failed to save contact message:', error);
    throw error;
  }
}

// Get contact messages for admin panel
export async function getContactMessages(params: GetContactMessagesParams = {}) {
  try {
    const { page = 1, limit = 10, status, priority } = params;
    const skip = (page - 1) * limit;
    
    const where: WhereClause = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    
    const [messages, totalCount] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.contactMessage.count({ where }),
    ]);
    
    return {
      messages,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  } catch (error) {
    console.error('❌ Failed to get contact messages:', error);
    throw error;
  }
}

// Mark message as read
export async function markMessageAsRead(messageId: string) {
  try {
    return await prisma.contactMessage.update({
      where: { id: messageId },
      data: { 
        isRead: true,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('❌ Failed to mark message as read:', error);
    throw error;
  }
}

// Newsletter subscription
export async function subscribeToNewsletter(email: string, name?: string, source?: string) {
  try {
    const subscription = await prisma.newsletter.upsert({
      where: { email },
      update: {
        isActive: true,
        name: name || undefined,
        source: source || undefined,
        updatedAt: new Date(),
      },
      create: {
        email,
        name,
        source,
      },
    });
    
    console.log('✅ Newsletter subscription saved:', email);
    return subscription;
  } catch (error) {
    console.error('❌ Failed to save newsletter subscription:', error);
    throw error;
  }
}

// Blog post functions (Future use)
export async function getBlogPosts(published = true) {
  try {
    return await prisma.blogPost.findMany({
      where: published ? { status: 'PUBLISHED' } : {},
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        publishedAt: true,
        readTime: true,
        viewCount: true,
        category: true,
        tags: true,
      },
    });
  } catch (error) {
    console.error('❌ Failed to get blog posts:', error);
    throw error;
  }
}

// Analytics functions (Future use)
export async function trackEvent(
  event: string,
  page?: string,
  data?: Prisma.JsonValue,
  sessionInfo?: SessionInfo
) {
  try {
    return await prisma.analytics.create({
      data: {
        event,
        page,
        data: data ?? Prisma.JsonNull,
        sessionId: sessionInfo?.sessionId,
        ipAddress: sessionInfo?.ipAddress,
        userAgent: sessionInfo?.userAgent,
        referrer: sessionInfo?.referrer,
      },
    });
  } catch (error) {
    console.error('❌ Failed to track event:', error);
    // Don't throw error for analytics to prevent disrupting user experience
  }
}

// User authentication - ADD THIS
export async function authenticateUser(email: string, password: string) {
  try {
    // Import auth functions to avoid circular imports
    const { verifyPassword } = await import('./auth');
    
    const user = await prisma.user.findUnique({
      where: { email, isActive: true },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true, // Using password field directly
      },
    });

    if (!user || !user.password) {
      return null;
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return null;
    }

    // Update login statistics
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLoginAt: new Date(),
        loginCount: { increment: 1 },
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  } catch (error) {
    console.error('❌ Authentication error:', error);
    return null;
  }
}

// Utility functions for enum conversion - Type safe
function convertBudgetToEnum(budget?: string): BudgetRange | undefined {
  if (!budget) return undefined;
  
  const budgetMap: Record<string, BudgetRange> = {
    '1500-5000': 'RANGE_1500_5000',
    '5000-15000': 'RANGE_5000_15000', 
    '15000-50000': 'RANGE_15000_50000',
    '50000-100000': 'RANGE_50000_100000',
    '100000+': 'RANGE_100000_PLUS',
  };
  
  return budgetMap[budget];
}

function convertProjectTypeToEnum(projectType: string): ProjectType {
  const typeMap: Record<string, ProjectType> = {
    'web-development': 'WEB_DEVELOPMENT',
    'mobile-app': 'MOBILE_APP',
    'consulting': 'CONSULTING',
    'maintenance': 'MAINTENANCE',
    'other': 'OTHER',
  };
  
  return typeMap[projectType] || 'OTHER';
}

export async function getBlogPostById(id: string) {
  try {
    return await prisma.blogPost.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        viewCount: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    console.error('❌ Failed to get blog post:', error);
    throw error;
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
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
        publishedAt: true,
        readTime: true,
        viewCount: true,
        category: true,
        tags: true,
        authorName: true,
        createdAt: true,
      },
    });

    if (post) {
      // Increment view count
      await prisma.blogPost.update({
        where: { id: post.id },
        data: {
          viewCount: { increment: 1 },
        },
      });
    }

    return post;
  } catch (error) {
    console.error('❌ Failed to get blog post by slug:', error);
    throw error;
  }
}

// Blog post kategorileri getir
export async function getBlogCategories() {
  try {
    const categories = await prisma.blogPost.groupBy({
      by: ['category'],
      where: {
        status: 'PUBLISHED',
        category: { not: null },
      },
      _count: {
        category: true,
      },
      orderBy: {
        _count: {
          category: 'desc',
        },
      },
    });

    return categories.map(cat => ({
      name: cat.category,
      count: cat._count.category,
    }));
  } catch (error) {
    console.error('❌ Failed to get blog categories:', error);
    return [];
  }
}

// Blog post etiketleri getir
export async function getBlogTags() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: 'PUBLISHED',
      },
      select: {
        tags: true,
      },
    });

    // Tüm etiketleri flatten et ve say
    const allTags = posts.flatMap(post => post.tags);
    const tagCounts = allTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // En çok kullanılan etiketleri döndür
    return Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 20)
      .map(([tag, count]) => ({ name: tag, count }));
  } catch (error) {
    console.error('❌ Failed to get blog tags:', error);
    return [];
  }
}

// Son blog yazıları - public
export async function getRecentBlogPosts(limit = 6) {
  try {
    return await prisma.blogPost.findMany({
      where: {
        status: 'PUBLISHED',
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        publishedAt: true,
        readTime: true,
        viewCount: true,
        category: true,
        tags: true,
        authorName: true,
      },
    });
  } catch (error) {
    console.error('❌ Failed to get recent blog posts:', error);
    return [];
  }
}

// Featured blog post
export async function getFeaturedBlogPost() {
  try {
    return await prisma.blogPost.findFirst({
      where: {
        status: 'PUBLISHED',
      },
      orderBy: {
        viewCount: 'desc',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        publishedAt: true,
        readTime: true,
        viewCount: true,
        category: true,
        tags: true,
        authorName: true,
      },
    });
  } catch (error) {
    console.error('❌ Failed to get featured blog post:', error);
    return null;
  }
}

// Blog istatistikleri
export async function getBlogStats() {
  try {
    const [totalPosts, publishedPosts, totalViews] = await Promise.all([
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { status: 'PUBLISHED' } }),
      prisma.blogPost.aggregate({
        _sum: {
          viewCount: true,
        },
        where: {
          status: 'PUBLISHED',
        },
      }),
    ]);

    return {
      totalPosts,
      publishedPosts,
      totalViews: totalViews._sum.viewCount || 0,
    };
  } catch (error) {
    console.error('❌ Failed to get blog stats:', error);
    return {
      totalPosts: 0,
      publishedPosts: 0,
      totalViews: 0,
    };
  }
}

// Database connection test
export async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}
