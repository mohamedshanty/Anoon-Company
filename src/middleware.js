import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // طبع كل الكوكيز عشان نشوفها
  console.log("🍪 All cookies:", req.cookies.getAll());

  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          const cookie = req.cookies.get(name)?.value;
          console.log(
            `🔍 Getting cookie ${name}:`,
            cookie ? "found" : "not found",
          );
          return cookie;
        },
        set(name, value, options) {
          console.log(`📝 Setting cookie ${name}`);
          res.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          console.log(`🗑️ Removing cookie ${name}`);
          res.cookies.set({ name, value: "", ...options });
        },
      },
    },
  );

  // انتظر الجلسة
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  console.log("📍 Path:", req.nextUrl.pathname);
  console.log(
    "👤 Session in middleware:",
    session ? "✅ موجودة" : "❌ مش موجودة",
  );
  if (session) {
    console.log("👤 User:", session.user.email);
  }
  if (error) {
    console.error("❌ Error:", error);
  }

  // إذا المسار محمي ومافيش جلسة، حول للـ login
  if (req.nextUrl.pathname.startsWith("/dashboard") && !session) {
    console.log("🔄 No session, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"], // أضفنا /login للتصحيح
};
