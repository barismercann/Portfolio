import { generateTokenForUser } from '@/lib/auth';
import { authenticateUser, trackEvent } from '@/lib/database';
import { loginSchema } from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    const user = await authenticateUser(validatedData.email, validatedData.password);
    
    if (!user) {
      await trackEvent('login_failed', '/admin/login', {
        email: validatedData.email,
        reason: 'invalid_credentials',
      });

      return NextResponse.json({
        success: false,
        message: 'Geçersiz email veya şifre',
      }, { status: 401 });
    }

    // Generate JWT token
    const token = await generateTokenForUser(user);

    // Track successful login
    await trackEvent('login_success', '/admin/login', {
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: 'Giriş başarılı',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('❌ Login API error:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({
        success: false,
        message: 'Email ve şifre gerekli',
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      message: 'Giriş sırasında hata oluştu',
    }, { status: 500 });
  }
}

// Logout endpoint
export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'Çıkış başarılı',
  });

  response.cookies.delete('auth-token');
  return response;
}