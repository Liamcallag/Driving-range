import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const reviewsPath = path.join(process.cwd(), 'data', 'reviews.json');

function readReviews(): Record<string, Review[]> {
  try {
    const raw = fs.readFileSync(reviewsPath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function writeReviews(data: Record<string, Review[]>) {
  fs.writeFileSync(reviewsPath, JSON.stringify(data, null, 2));
}

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const all = readReviews();
  return NextResponse.json(all[slug] ?? []);
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

  const review: Review = {
    id: Date.now().toString(),
    author: String(author).slice(0, 60),
    rating: Number(rating),
    comment: String(comment).slice(0, 1000),
    date: new Date().toISOString(),
  };

  const all = readReviews();
  if (!all[slug]) all[slug] = [];
  all[slug].unshift(review);

  writeReviews(all);
  return NextResponse.json(review, { status: 201 });
}
