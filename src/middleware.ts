import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Pass through without blocking if running in mock/placeholder mode
  const isPlaceholder =
    !supabaseUrl ||
    !supabaseAnonKey ||
    supabaseUrl.includes('placeholder.supabase.co') ||
    supabaseUrl.includes('sua_url_aqui');

  if (isPlaceholder) {
    return supabaseResponse;
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: Array<{
            name: string;
            value: string;
            options?: Parameters<typeof supabaseResponse.cookies.set>[2];
          }>
        ) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const pathname = request.nextUrl.pathname;
    const isAuthPage = pathname === '/login';

    // Helper to forward cookies across redirects (Supabase SSR best practice)
    const createRedirect = (targetPath: string) => {
      const url = request.nextUrl.clone();
      url.pathname = targetPath;
      const redirectResponse = NextResponse.redirect(url);
      supabaseResponse.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
      });
      return redirectResponse;
    };

    // If unauthenticated and not on auth page -> redirect to /login
    if (!user && !isAuthPage) {
      return createRedirect('/login');
    }

    // If authenticated and on /login -> redirect to home sanctuary /
    if (user && isAuthPage) {
      return createRedirect('/');
    }
  } catch (error) {
    console.error('[Middleware] Erro ao verificar sessão Supabase:', error);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icons, public assets, api/upload
     */
    '/((?!_next/static|_next/image|favicon.ico|icons|manifest.webmanifest|api/upload|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
