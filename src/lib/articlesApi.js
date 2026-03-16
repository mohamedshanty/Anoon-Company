// lib/articlesApi.js
// Server-only module — all functions use supabaseAdmin
import { supabaseAdmin } from "./supabaseAdmin";
import { generateSlug } from "./slugUtils";

// Re-export so existing imports keep working
export { generateSlug };

// ─── Slug helpers ────────────────────────────────────────────────────────────

export async function ensureUniqueSlug(slug, excludeId) {
  let candidate = slug;
  let counter = 1;

  while (true) {
    let query = supabaseAdmin
      .from("articles")
      .select("id")
      .eq("slug", candidate);

    if (excludeId) query = query.neq("id", excludeId);

    const { data } = await query.maybeSingle();

    if (!data) return candidate;

    candidate = `${slug}-${counter++}`;
  }
}

// ─── Read ───────────────────────────────────────────────────────────────────

export async function getPublishedArticles() {
  const { data, error } = await supabaseAdmin
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getArticleBySlug(slug) {
  const { data, error } = await supabaseAdmin
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getAllArticlesAdmin() {
  const { data, error } = await supabaseAdmin
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getArticleById(id) {
  const { data, error } = await supabaseAdmin
    .from("articles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

// ─── Server-Side Stats ─────────────────────────────────────────────────────

export async function getArticleStats() {
  let data;
  const { data: withShares, error: withSharesError } = await supabaseAdmin
    .from("articles")
    .select("status, views, likes, shares");

  if (withSharesError?.code === "42703") {
    const { data: withoutShares, error: fallbackError } = await supabaseAdmin
      .from("articles")
      .select("status, views, likes");
    if (fallbackError) throw fallbackError;
    data = withoutShares;
  } else if (withSharesError) {
    throw withSharesError;
  } else {
    data = withShares;
  }

  const total = data?.length ?? 0;
  const published = data?.filter((a) => a.status === "published").length ?? 0;
  const drafts = data?.filter((a) => a.status === "draft").length ?? 0;
  const totalViews = data?.reduce((s, a) => s + (a.views ?? 0), 0) ?? 0;
  const totalLikes = data?.reduce((s, a) => s + (a.likes ?? 0), 0) ?? 0;
  const totalShares = data?.reduce((s, a) => s + (a.shares ?? 0), 0) ?? 0;

  return { total, published, drafts, totalViews, totalLikes, totalShares };
}

// ─── Create ───────────────────────────────────────────────────────────────────

export async function createArticle(input) {
  try {
    const slug = await ensureUniqueSlug(
      input.slug || generateSlug(input.title),
    );
    const now = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from("articles")
      .insert({
        ...input,
        slug,
        views: 0,
        likes: 0,
        shares: 0,
        created_at: now,
        updated_at: now,
        published_at: input.status === "published" ? now : null,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in createArticle:", error);
    throw error;
  }
}

// ─── Update ───────────────────────────────────────────────────────────────────

export async function updateArticle(id, input) {
  try {
    const now = new Date().toISOString();

    let slug = input.slug;
    if (slug) {
      slug = await ensureUniqueSlug(slug, id);
    }

    const { data, error } = await supabaseAdmin
      .from("articles")
      .update({
        ...input,
        ...(slug ? { slug } : {}),
        updated_at: now,
        ...(input.status === "published" && !input.published_at
          ? { published_at: now }
          : {}),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error in updateArticle:", error);
    throw error;
  }
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deleteArticle(id) {
  try {
    const { error } = await supabaseAdmin
      .from("articles")
      .delete()
      .eq("id", id);
    if (error) throw error;
  } catch (error) {
    console.error("Error in deleteArticle:", error);
    throw error;
  }
}

// ─── Publish / Unpublish ──────────────────────────────────────────────────────

export async function togglePublish(id, publish) {
  return updateArticle(id, {
    status: publish ? "published" : "draft",
    published_at: publish ? new Date().toISOString() : null,
  });
}

// ─── Views & Likes ────────────────────────────────────────────────────────────

export async function incrementViews(id) {
  const { data, error } = await supabaseAdmin.rpc("increment_views", {
    article_id: id,
  });
  if (error) throw error;
  return data;
}

export async function updateLikes(id, increment) {
  const { data, error } = await supabaseAdmin.rpc("update_likes", {
    article_id: id,
    inc: increment ? 1 : -1,
  });
  if (error) throw error;
  return data;
}

export async function incrementShares(id) {
  const { data, error } = await supabaseAdmin.rpc("increment_shares", {
    article_id: id,
  });
  if (error) throw error;
  return data;
}
