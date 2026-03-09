// lib/slugUtils.js
// Client-safe slug utility — can be imported from both client and server components

/**
 * Convert a title string into a URL-safe slug.
 * Supports Arabic and English characters.
 */
export function generateSlug(title) {
  if (!title) return "";

  return title
    .toLowerCase()
    .trim()
    .replace(/[^\u0600-\u06FFa-z0-9\s-]/g, "") // Arabic + English + numbers
    .replace(/\s+/g, "-") // spaces → hyphens
    .replace(/-+/g, "-") // collapse multiple hyphens
    .replace(/^-|-$/g, ""); // trim leading/trailing hyphens
}
