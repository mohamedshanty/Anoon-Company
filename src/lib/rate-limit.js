import { LRUCache } from 'lru-cache';

const options = {
  max: 500, // Store up to 500 IPs
  ttl: 1000 * 60 * 15, // 15 minutes TTL
};

const tokenCache = new LRUCache(options);

export const rateLimit = (ip) => {
  const tokenCount = tokenCache.get(ip) || [0];
  if (tokenCount[0] === 0) {
    tokenCache.set(ip, [1]);
  }
  tokenCount[0] += 1;

  const currentUsage = tokenCount[0];
  const isRateLimited = currentUsage >= 5; // Max 5 requests per 15 mins per IP

  return {
    isRateLimited,
    currentUsage,
  };
};
