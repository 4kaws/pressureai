import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { storeSignup } from '@/lib/kv';

const SignupSchema = z.object({
  email: z.string().email(),
  source: z.string().optional().default('landing'),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = SignupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const { email, source } = parsed.data;

  if (process.env.KV_REST_API_URL) {
    await storeSignup(email, source);
  }

  return NextResponse.json({ ok: true });
}
