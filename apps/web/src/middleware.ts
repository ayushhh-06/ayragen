import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  const token = request.cookies.get('access_token')?.value;

  // Define domains to exclude from subdomain routing
  const rootDomains = ['localhost:3000', 'ayragen.com', 'ayragen.vercel.app'];
  
  // Check if current host is a root domain
  const isRootDomain = rootDomains.includes(hostname);

  // If it's a subdomain, rewrite to /p/[subdomain]
  if (!isRootDomain && !pathname.startsWith('/_next') && !pathname.startsWith('/api') && !pathname.startsWith('/p/')) {
    const subdomain = hostname.split('.')[0];
    
    // Check if it's not just "www"
    if (subdomain && subdomain !== 'www') {
      console.log(`[MIDDLEWARE] Rewriting ${hostname}${pathname} to /p/${subdomain}${pathname}`);
      return NextResponse.rewrite(new URL(`/p/${subdomain}${pathname}`, request.url));
    }
  }

  // --- STANDARD AUTH PROTECTION ---
  
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
