import { verifyJWT } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log('🚀 MIDDLEWARE: Processing', pathname);

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
    console.log('⏭️  MIDDLEWARE: Skipping for public route:', pathname);
    return NextResponse.next();
  }

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    console.log('🔒 MIDDLEWARE: Processing admin route:', pathname);
    
    // ✅ Allow access to login page without redirect loop
    if (pathname === '/admin/login') {
      console.log('🚪 MIDDLEWARE: Admin login page - checking existing auth');
      
      const token = request.cookies.get('auth-token')?.value;
      if (token) {
        console.log('🍪 MIDDLEWARE: Found existing token, verifying...');
        const payload = await verifyJWT(token);
        if (payload) {
          console.log('✅ MIDDLEWARE: Valid token, redirecting to dashboard');
          return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
      }
      console.log('🚪 MIDDLEWARE: No valid token, allowing login page');
      return NextResponse.next();
    }

    // ✅ Handle /admin root path - redirect to dashboard if authenticated, login if not
    if (pathname === '/admin') {
      console.log('🏠 MIDDLEWARE: Admin root path, checking auth...');
      
      const token = request.cookies.get('auth-token')?.value;
      if (token) {
        const payload = await verifyJWT(token);
        if (payload) {
          console.log('✅ MIDDLEWARE: Valid token, redirecting /admin to /admin/dashboard');
          return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
      }
      
      console.log('❌ MIDDLEWARE: No valid token, redirecting /admin to /admin/login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // ✅ For all other admin routes, check authentication
    console.log('🛡️  MIDDLEWARE: Checking auth for protected admin route:', pathname);
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      console.log('❌ MIDDLEWARE: No auth token found, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      console.log('🔍 MIDDLEWARE: Verifying JWT token...');
      const payload = await verifyJWT(token);
      
      if (!payload) {
        console.log('❌ MIDDLEWARE: Invalid token, redirecting to login');
        const redirectResponse = NextResponse.redirect(new URL('/admin/login', request.url));
        redirectResponse.cookies.delete('auth-token');
        return redirectResponse;
      }

      console.log('✅ MIDDLEWARE: Valid token for user:', payload.email);
      return NextResponse.next();
      
    } catch (error) {
      console.error('❌ MIDDLEWARE: JWT verification error:', error);
      const redirectResponse = NextResponse.redirect(new URL('/admin/login', request.url));
      redirectResponse.cookies.delete('auth-token');
      return redirectResponse;
    }
  }

  console.log('✅ MIDDLEWARE: Completed processing for:', pathname);
  return NextResponse.next();
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