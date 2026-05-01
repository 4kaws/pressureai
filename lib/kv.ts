import { Redis } from '@upstash/redis';

let _kv: Redis | null = null;

function getKv(): Redis {
  if (!_kv) {
    _kv = new Redis({
      url: process.env.KV_REST_API_URL ?? '',
      token: process.env.KV_REST_API_TOKEN ?? '',
    });
  }
  return _kv;
}

export async function getRateLimit(ip: string): Promise<number> {
  const kv = getKv();
  const key = `ratelimit:${ip}:${new Date().toISOString().slice(0, 10)}`;
  const count = await kv.incr(key);
  if (count === 1) {
    await kv.expire(key, 86400);
  }
  return count;
}

export async function storeSignup(email: string, source: string): Promise<void> {
  const kv = getKv();
  await kv.lpush('signups:list', JSON.stringify({ email, source, ts: Date.now() }));
}
