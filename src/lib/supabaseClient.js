// lib/supabaseClient.js
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey, {
  cookies: {
    get(name) {
      // جلب الكوكيز من المتصفح
      const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = value;
        return acc;
      }, {});
      return cookies[name] || null;
    },
    set(name, value, options) {
      // تعيين الكوكيز في المتصفح
      let cookie = `${name}=${value}; path=/`;

      if (options?.maxAge) {
        cookie += `; max-age=${options.maxAge}`;
      }
      if (options?.domain) {
        cookie += `; domain=${options.domain}`;
      }
      if (options?.sameSite) {
        cookie += `; samesite=${options.sameSite}`;
      }
      if (options?.secure) {
        cookie += `; secure`;
      }

      document.cookie = cookie;

      // للتأكد من تعيين الكوكيز
      console.log(`🍪 Cookie set: ${name}=${value}`);
    },
    remove(name) {
      // حذف الكوكيز
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      console.log(`🗑️ Cookie removed: ${name}`);
    },
  },
});
