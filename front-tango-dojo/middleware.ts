import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("dojoAccessToken")?.value;
  const { pathname } = req.nextUrl;

  // 1. 토큰이 있는 경우
  if (token) {
    // 1-1. 루트 페이지 또는 회원가입 페이지에 접근 시 -> 대시보드로 리디렉션
    if (pathname === "/" || pathname === "/sign-up") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // 2. 토큰이 없는 경우
  else {
    // 2-1. 대시보드 관련 페이지에 접근 시 -> 루트 페이지로 리디렉션
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-up", "/"],
};
