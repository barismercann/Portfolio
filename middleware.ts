import { verifyJWT } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes, static files, and public routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname === '/' ||
    pathname === '/portfolio' ||
    pathname === '/contact' ||
    pathname === '/blog' ||
    pathname.startsWith('/portfolio/') ||
    pathname.startsWith('/blog/')
  ) {
    // Add pathname header for layout detection
    const response = NextResponse.next();
    response.headers.set('x-pathname', pathname);
    return response;
  }

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    // ✅ IMPORTANT: Set header for ALL admin routes including login
    const response = NextResponse.next();
    response.headers.set('x-pathname', pathname);

    // Allow access to login page
    if (pathname === '/admin/login') {
      // If already authenticated, redirect to dashboard
      const token = request.cookies.get('auth-token')?.value;
      if (token) {
        const payload = await verifyJWT(token);
        if (payload) {
          return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
      }
      return response; // ✅ Login sayfası için header set edip return et
    }

    // For all other admin routes, check authentication
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      console.log('❌ No auth token found, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const payload = await verifyJWT(token);
      
      if (!payload) {
        console.log('❌ Invalid token, redirecting to login');
        const redirectResponse = NextResponse.redirect(new URL('/admin/login', request.url));
        redirectResponse.cookies.delete('auth-token');
        return redirectResponse;
      }

      console.log('✅ Valid token for user:', payload.email);
      return response;
      
    } catch (error) {
      console.error('❌ JWT verification error in middleware:', error);
      const redirectResponse = NextResponse.redirect(new URL('/admin/login', request.url));
      redirectResponse.cookies.delete('auth-token');
      return redirectResponse;
    }
  }

  // Add pathname header for all other routes
  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};