/**
 * Lightweight localStorage-based cache manager.
 * Used as a fast L2 cache for React Query placeholder data and
 * for persisting user preferences / form drafts.
 *
 * TTL constants:
 *   DYNAMIC   – frequently changing server data (5 min)
 *   STATIC    – rarely changing content (1 hr)
 *   REFERENCE – near-permanent reference data (24 hr)
 *   DRAFT     – form drafts / autosave (7 days)
 */

const CACHE_VERSION = "1";
const PREFIX = `anoon_v${CACHE_VERSION}_`;

export const TTL = {
  DYNAMIC: 5 * 60 * 1000,
  STATIC: 60 * 60 * 1000,
  REFERENCE: 24 * 60 * 60 * 1000,
  DRAFT: 7 * 24 * 60 * 60 * 1000,
};

function read(key) {
  try {
    return localStorage.getItem(PREFIX + key);
  } catch {
    return null;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(PREFIX + key, value);
    return true;
  } catch {
    return false;
  }
}

function remove(key) {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {}
}

export const cacheManager = {
  /**
   * Store a value with an expiry.
   * @param {string} key
   * @param {*} data – anything JSON-serialisable
   * @param {number} [ttl] – milliseconds until stale (default: DYNAMIC)
   */
  set(key, data, ttl = TTL.DYNAMIC) {
    const entry = {
      data,
      expires: Date.now() + ttl,
      cachedAt: Date.now(),
    };
    write(key, JSON.stringify(entry));
  },

  /**
   * Retrieve a value. Returns null when missing or expired.
   */
  get(key) {
    const raw = read(key);
    if (!raw) return null;
    try {
      const entry = JSON.parse(raw);
      if (Date.now() > entry.expires) {
        remove(key);
        return null;
      }
      return entry.data;
    } catch {
      remove(key);
      return null;
    }
  },

  /** Remove a single entry. */
  invalidate(key) {
    remove(key);
  },

  /**
   * Remove all entries whose key starts with the given prefix.
   * Useful for invalidating an entire data category.
   */
  invalidatePrefix(prefix) {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(PREFIX + prefix))
        .forEach((k) => localStorage.removeItem(k));
    } catch {}
  },

  /** Wipe all entries created by this manager. */
  clear() {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(PREFIX))
        .forEach((k) => localStorage.removeItem(k));
    } catch {}
  },

  TTL,
};
