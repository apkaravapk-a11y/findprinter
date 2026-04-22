type CacheEntry<T> = { value: T; expiresAt: number };

const store = new Map<string, CacheEntry<unknown>>();

export const cache = {
  get<T>(key: string): T | null {
    const hit = store.get(key) as CacheEntry<T> | undefined;
    if (!hit) return null;
    if (Date.now() > hit.expiresAt) {
      store.delete(key);
      return null;
    }
    return hit.value;
  },
  set<T>(key: string, value: T, ttlSeconds: number): void {
    store.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
  },
};
