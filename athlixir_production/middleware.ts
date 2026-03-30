import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const session = req.cookies.get('athlixir_session');
  const isAuth = !!session;
  const url = req.nextUrl.clone();

  // Protect all routes except login, signup, callback, and static
  if (!isAuth && !url.pathname.startsWith('/login') && !url.pathname.startsWith('/signup') && !url.pathname.startsWith('/auth/callback') && !url.pathname.startsWith('/_next') && !url.pathname.startsWith('/api')) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  // Logout: clear cookie
  if (url.pathname === '/logout') {
    const res = NextResponse.redirect('/login');
    res.cookies.set('athlixir_session', '', { path: '/', maxAge: 0 });
    return res;
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|api|public|favicon.ico).*)',
  ],
};
