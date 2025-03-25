import { NextResponse } from 'next/server';

export function middleware(request) {
  // Simple authorization check
  const url = request.nextUrl.clone();
  
  // Protected route
  if (url.pathname.startsWith('/admin')) {
    // Simulate unauthorized access
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}
