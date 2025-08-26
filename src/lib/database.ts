import { Prisma, PrismaClient } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
// Global Prisma instance to prevent connection issues
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Define enum types locally
export type BudgetRange = 'RANGE_1500_5000' | 'RANGE_5000_15000' | 'RANGE_15000_50000' | 'RANGE_50000_100000' | 'RANGE_100000_PLUS';
export type ProjectType = 'WEB_DEVELOPMENT' | 'MOBILE_APP' | 'CONSULTING' | 'MAINTENANCE' | 'OTHER';
export type MessagePriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type MessageStatus = 'NEW' | 'IN_PROGRESS' | 'REPLIED' | 'CLOSED';

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
  data?: JsonValue,
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

// User authentication
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
        hashedPassword: true,
      },
    });

    if (!user || !user.hashedPassword) {
      return null;
    }

    const isValidPassword = await verifyPassword(password, user.hashedPassword);
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