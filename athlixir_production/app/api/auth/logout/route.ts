import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // Clear session cookie
  const res = NextResponse.redirect('/login');
  res.cookies.set('athlixir_session', '', { path: '/', maxAge: 0 });
  return res;
}
