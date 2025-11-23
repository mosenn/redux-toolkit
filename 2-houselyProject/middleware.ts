import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
console.log("Middleware is running!");

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;
  const pathname = req.nextUrl.pathname;
  const cookie = req.headers.get("cookie") || ""; // همه کوکی‌های ارسالی از کلاینت

  console.log("token in middelware", token);
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    // id , sessionId
    //jwt = user -> jwt.verfiy = role.
    const res = await fetch(`http://localhost:2025/auth/profile`, {
      headers: { cookie: cookie },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const user = await res.json();
    console.log("User role from middleware:", user.role);

    if (
      (pathname.startsWith("/admin") ||
        pathname.startsWith("/dashboard/admin")) &&
      user.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (
      (pathname.startsWith("/user") ||
        pathname.startsWith("/dashboard/user")) &&
      !["USER"].includes(user.role)
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Middleware Error:", err);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/admin/:path*",
    "/user/:path*",
    "/dashboard/user/:path*",
  ],
};
