import { verifyAuth } from '@/lib/auth';
import { prisma } from '@/lib/database';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const authPayload = await verifyAuth(request);
    
    if (!authPayload) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized',
      }, { status: 401 });
    }

    // Get fresh user data from database
    const user = await prisma.user.findUnique({
      where: { 
        id: authPayload.userId,
        isActive: true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        lastLoginAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        lastLoginAt: user.lastLoginAt,
      },
    });
  } catch (error) {
    console.error('❌ Get user API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Authentication check failed',
    }, { status: 500 });
  }
}