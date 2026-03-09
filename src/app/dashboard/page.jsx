// app/dashboard/page.js
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import DashboardClient from "./DashboardClient";
import { getArticleStats } from "@/lib/articlesApi";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      console.error("❌ Auth error:", error);
      redirect("/login");
    }

    // الآن هذه الدالة تعمل لأنها تستخدم supabaseAdmin داخلياً
    const stats = await getArticleStats();

    return <DashboardClient user={user} initialStats={stats} />;
  } catch (error) {
    console.error("❌ Dashboard page error:", error);
    redirect("/login");
  }
}
