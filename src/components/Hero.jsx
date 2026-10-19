import { useEffect, useState } from 'react';

function formatRating(rating) {
  if (rating === undefined || rating === null || rating === '' || rating === '—') return '';
  const n = Number(rating);
  return Number.isFinite(n) && n > 0 ? n.toFixed(1) : '';
}

function Hero({ items, onSelect }) {
  const [index, setIndex] = useState(0);
  const active = items[index] ?? items[0];

  // Auto-advance. Re-arms after every change, so clicking an arrow or dot
  // gives the new slide a full 5 seconds before moving on.
  useEffect(() => {
    if (items.length < 2) return undefined;
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [items.length, index]);

  useEffect(() => {
    if (index > items.length - 1) setIndex(0);
  }, [index, items.length]);

  if (!active) return null;

  const rating = formatRating(active.rating);
  const year = active.year && active.year !== '—' ? active.year : '';
  const go = (step) => setIndex((current) => (current + step + items.length) % items.length);

  return (
    <section className="hero" style={{ backgroundImage: `url(${active.backdrop})` }}>
      <div className="hero-overlay" />

      {items.length > 1 && (
        <>
          <button type="button" className="hero-arrow hero-arrow--prev" onClick={() => go(-1)} aria-label="Previous slide">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button type="button" className="hero-arrow hero-arrow--next" onClick={() => go(1)} aria-label="Next slide">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </>
      )}

      <div className="hero-card" key={active.id}>
        <h1>{active.title}</h1>

        {(rating || year) && (
          <div className="hero-meta">
            {rating && <span className="hero-chip hero-chip--rating"><span className="hero-star">★</span>{rating}</span>}
            {year && <span className="hero-chip">{year}</span>}
          </div>
        )}

        <p>{active.description}</p>

        <div className="hero-actions">
          <button type="button" className="hero-btn hero-btn-primary" onClick={() => onSelect(active.id)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
            View Details
          </button>
        </div>
      </div>

      <div className="hero-dots" aria-label="Hero slider controls">
        {items.map((item, dotIndex) => (
          <button
            key={item.id}
            className={dotIndex === index ? 'active' : ''}
            onClick={() => setIndex(dotIndex)}
            aria-label={`Show ${item.title}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
