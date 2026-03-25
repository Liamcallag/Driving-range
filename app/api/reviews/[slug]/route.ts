import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { randomBytes } from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data, error } = await supabase
    .from('reviews')
    .select('id, author, rating, comment, date')
    .eq('range_slug', slug)
    .order('date', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await req.json();
  const { author, rating, comment } = body;

  if (!author || !rating || !comment) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  if (rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Rating must be 1–5' }, { status: 400 });
  }

  const deleteToken = randomBytes(24).toString('hex');

  const review = {
    id: Date.now().toString(),
    range_slug: slug,
    author: String(author).slice(0, 60),
    rating: Number(rating),
    comment: String(comment).slice(0, 1000),
    date: new Date().toISOString(),
    delete_token: deleteToken,
  };

  const { data, error } = await supabase.from('reviews').insert(review).select('id, author, rating, comment, date').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ...data, deleteToken }, { status: 201 });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const token = searchParams.get('token');

  if (!id || !token) return NextResponse.json({ error: 'Missing id or token' }, { status: 400 });

  // Verify token matches before deleting
  const { data: existing } = await supabase
    .from('reviews')
    .select('delete_token')
    .eq('id', id)
    .eq('range_slug', slug)
    .single();

  if (!existing || existing.delete_token !== token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id)
    .eq('range_slug', slug);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
