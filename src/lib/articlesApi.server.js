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
import "server-only";
import { supabaseAdmin } from "./supabaseAdmin";

export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function ensureUniqueSlug(slug, excludeId) {
  let candidate = slug;
  let counter = 1;
  const MAX_TRIES = 20;
  while (counter <= MAX_TRIES) {
    let query = supabaseAdmin
      .from("articles")
      .select("id")
      .eq("slug", candidate);
    if (excludeId) query = query.neq("id", excludeId);
    const { data } = await query.maybeSingle();
    if (!data) return candidate;
    candidate = `${slug}-${counter++}`;
  }
  throw new Error(`Could not generate unique slug for: ${slug}`);
}

export async function getAllArticlesAdmin() {
  const { data, error } = await supabaseAdmin
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function createArticle(input) {
  const slug = await ensureUniqueSlug(input.slug || generateSlug(input.title));
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
      published_at:
        input.status === "published" ? input.published_at || now : null,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}
