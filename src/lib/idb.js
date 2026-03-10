/**
 * Lightweight IndexedDB wrapper (L3 offline cache).
 *
 * Stores large collections (articles, programs, courses) for
 * immediate display while the network request is in-flight or
 * when the browser is offline.
 *
 * All public methods are async and fail silently – callers should
 * never have to handle IDB errors for non-critical offline paths.
 */

const DB_NAME = "anoon_db";
const DB_VERSION = 1;

export const IDB_STORES = {
  ARTICLES: "articles",
  PROGRAMS: "programs",
  COURSES: "courses",
  DRAFTS: "drafts",
};

let _dbPromise = null;

function openDB() {
  if (_dbPromise) return _dbPromise;

  _dbPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB unavailable"));
      return;
    }

    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (e) => {
      const db = e.target.result;

      if (!db.objectStoreNames.contains(IDB_STORES.ARTICLES)) {
        const s = db.createObjectStore(IDB_STORES.ARTICLES, { keyPath: "id" });
        s.createIndex("status", "status", { unique: false });
        s.createIndex("updated_at", "updated_at", { unique: false });
      }

      if (!db.objectStoreNames.contains(IDB_STORES.PROGRAMS)) {
        db.createObjectStore(IDB_STORES.PROGRAMS, { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains(IDB_STORES.COURSES)) {
        const s = db.createObjectStore(IDB_STORES.COURSES, { keyPath: "id" });
        s.createIndex("program_id", "program_id", { unique: false });
      }

      if (!db.objectStoreNames.contains(IDB_STORES.DRAFTS)) {
        db.createObjectStore(IDB_STORES.DRAFTS, { keyPath: "key" });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => {
      _dbPromise = null;
      reject(req.error);
    };
  });

  return _dbPromise;
}

async function withStore(storeName, mode, fn) {
  try {
    const db = await openDB();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, mode);
      const store = tx.objectStore(storeName);
      const req = fn(store);
      if (req) {
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      } else {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      }
    });
  } catch {
    return null;
  }
}

export const idb = {
  /** Retrieve all records from a store. Returns [] on failure. */
  async getAll(storeName) {
    return (await withStore(storeName, "readonly", (s) => s.getAll())) ?? [];
  },

  /** Retrieve a single record by primary key. */
  async get(storeName, id) {
    return withStore(storeName, "readonly", (s) => s.get(id));
  },

  /** Retrieve records matching an index value. */
  async getByIndex(storeName, indexName, value) {
    try {
      const db = await openDB();
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, "readonly");
        const req = tx.objectStore(storeName).index(indexName).getAll(value);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    } catch {
      return [];
    }
  },

  /** Store (or overwrite) a single record. */
  async put(storeName, record) {
    return withStore(storeName, "readwrite", (s) => s.put(record));
  },

  /** Bulk-store an array of records efficiently. */
  async putMany(storeName, records) {
    if (!Array.isArray(records) || records.length === 0) return;
    try {
      const db = await openDB();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        records.forEach((r) => store.put(r));
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch {}
  },

  /** Delete a single record by primary key. */
  async delete(storeName, id) {
    return withStore(storeName, "readwrite", (s) => s.delete(id));
  },

  /** Remove all records from a store. */
  async clear(storeName) {
    return withStore(storeName, "readwrite", (s) => s.clear());
  },

  // ── Draft helpers ──────────────────────────────────────────────────────

  /** Save an article / form draft keyed by a string id. */
  async saveDraft(key, data) {
    return withStore(IDB_STORES.DRAFTS, "readwrite", (s) =>
      s.put({ key, data, savedAt: Date.now() }),
    );
  },

  /** Retrieve a previously saved draft. Returns null if not found. */
  async getDraft(key) {
    const entry = await withStore(IDB_STORES.DRAFTS, "readonly", (s) =>
      s.get(key),
    );
    return entry?.data ?? null;
  },

  /** Delete a draft after successful save. */
  async deleteDraft(key) {
    return withStore(IDB_STORES.DRAFTS, "readwrite", (s) => s.delete(key));
  },
};
