import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';

export default async function middleware(req: NextRequest) {
  const token = (await cookies()).get("jwt_token");
  const url = req.nextUrl.clone();
  const { pathname, searchParams } = url;
  
  const excluded_paths = [
    '/_next',
    '/_vercel',
    '/api',
    '/favicon.ico'
  ];
  
  if (excluded_paths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  const path_from = searchParams.get("pathfrom") || "categories";

  if (!token && !pathname.startsWith("/login")) {
    url.pathname = '/login';
    url.searchParams.set("pathfrom", pathname.slice(1));
    return NextResponse.redirect(url, { status: 303 });
  }

  if (token && (pathname.startsWith("/login") || pathname === "/")) {
    url.pathname = `/${path_from}`;
    return NextResponse.redirect(url, { status: 303 });
  }
  
  return NextResponse.next(); 
}