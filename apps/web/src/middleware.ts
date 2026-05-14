import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedPaths = ['/dashboard', '/builder', '/editor', '/profile'];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // Auth routes (redirect to dashboard if already logged in)
  const authPaths = ['/auth'];
  const isAuthPage = authPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/builder/:path*', '/editor/:path*', '/profile/:path*', '/auth'],
};
