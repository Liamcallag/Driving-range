'use client';

import { useState, useEffect, useRef } from 'react';

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

function StarPicker({ id, value, onChange }: { id?: string; value: number; onChange: (n: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div id={id} role="group" aria-label="Star rating" className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
          className="text-2xl transition-colors focus:outline-none"
          aria-label={`${n} star${n !== 1 ? 's' : ''}`}
        >
          <span className={(hovered || value) >= n ? 'text-amber-400' : 'text-slate-200'}>★</span>
        </button>
      ))}
    </div>
  );
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={`text-sm ${rating >= n ? 'text-amber-400' : 'text-slate-200'}`}>★</span>
      ))}
    </span>
  );
}

const TOKENS_KEY = 'review_delete_tokens';

function getStoredTokens(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(TOKENS_KEY) ?? '{}'); } catch { return {}; }
}

function saveToken(reviewId: string, token: string) {
  const tokens = getStoredTokens();
  tokens[reviewId] = token;
  localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
}

export default function ReviewSection({ slug }: { slug: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [myTokens, setMyTokens] = useState<Record<string, string>>({});
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setMyTokens(getStoredTokens());
    fetch(`/api/reviews/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setReviews(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!author.trim()) { setError('Please enter your name.'); return; }
    if (rating === 0) { setError('Please select a star rating.'); return; }
    if (!comment.trim()) { setError('Please write a comment.'); return; }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/reviews/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, rating, comment }),
      });
      if (!res.ok) throw new Error('Failed');
      const { deleteToken, ...newReview } = await res.json();
      if (deleteToken) {
        saveToken(newReview.id, deleteToken);
        setMyTokens((prev) => ({ ...prev, [newReview.id]: deleteToken }));
      }
      setReviews((prev) => [newReview, ...prev]);
      setAuthor('');
      setRating(0);
      setComment('');
      setSuccess(true);
      setShowForm(false);
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this review?')) return;
    const token = myTokens[id];
    if (!token) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/reviews/${slug}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, token }),
      });
      if (!res.ok) throw new Error('Failed');
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert('Failed to delete review.');
    } finally {
      setDeleting(null);
    }
  }

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Reviews</h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <StarDisplay rating={Math.round(avgRating)} />
              <span className="text-sm text-slate-600">
                {avgRating.toFixed(1)} · {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
        {!showForm && (
          <button
            onClick={() => { setShowForm(true); setTimeout(() => firstFieldRef.current?.focus(), 0); }}
            className="text-sm font-medium bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Write a Review
          </button>
        )}
      </div>

      {/* Success message */}
      {success && (
        <div role="status" aria-live="polite" className="mb-4 px-4 py-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg">
          Thanks for your review!
        </div>
      )}

      {/* Review Form */}
      {showForm && (
        <form onSubmit={handleSubmit} aria-label="Leave a review" className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">Leave a Review</h3>

          <div>
            <label htmlFor="review-author" className="block text-xs font-medium text-slate-600 mb-1">Your Name <span className="text-red-400" aria-hidden="true">*</span></label>
            <input
              id="review-author"
              ref={firstFieldRef}
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. John D."
              maxLength={60}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="review-rating" className="block text-xs font-medium text-slate-600 mb-1">Rating <span className="text-red-400" aria-hidden="true">*</span></label>
            <StarPicker id="review-rating" value={rating} onChange={setRating} />
          </div>

          <div>
            <label htmlFor="review-comment" className="block text-xs font-medium text-slate-600 mb-1">Comment <span className="text-red-400" aria-hidden="true">*</span></label>
            <textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              rows={4}
              maxLength={1000}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
            <p className="text-xs text-slate-400 text-right mt-0.5" aria-live="polite">{comment.length}/1000</p>
          </div>

          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setError(''); setAuthor(''); setRating(0); setComment(''); }}
              className="px-4 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Reviews list */}
      {loading ? (
        <p className="text-sm text-slate-400">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-slate-400">No reviews yet. Be the first to leave one!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-t border-slate-100 pt-4 first:border-0 first:pt-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{review.author}</p>
                  <StarDisplay rating={review.rating} />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <time className="text-xs text-slate-400">
                    {new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </time>
                  {myTokens[review.id] && (
                    <button
                      onClick={() => handleDelete(review.id)}
                      disabled={deleting === review.id}
                      className="text-xs text-red-400 hover:text-red-600 transition-colors disabled:opacity-40"
                      aria-label="Delete review"
                    >
                      {deleting === review.id ? '…' : '✕'}
                    </button>
                  )}
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
