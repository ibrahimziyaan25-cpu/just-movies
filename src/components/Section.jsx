import { useCallback, useEffect, useRef, useState } from 'react';
import MovieCard from './MovieCard.jsx';

const getIcon = (title = '') => {
  if (title.includes('Suggest'))                                   return '✨';
  if (title.includes('Latest Movie') || title.includes('Movie'))  return '🎬';
  if (title.includes('Series') || title.includes('TV'))           return '📺';
  if (title.includes('Like') || title.includes('Recommend'))      return '❤️';
  if (title.includes('Search') || title.includes('Result'))       return '🔍';
  if (title.includes('Trend'))                                     return '🔥';
  if (title.includes('New') || title.includes('Latest'))          return '⚡';
  return '🎥';
};

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-poster" />
      <div className="skeleton-title" />
      <div className="skeleton-title-short" />
    </div>
  );
}

// Sideways-scrolling row with arrow buttons (used for the home page rows)
function Rail({ items, onSelect }) {
  const scrollerRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = scrollerRef.current;
    if (!el) return undefined;
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    observer?.observe(el);
    window.addEventListener('resize', update);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [items, update]);

  const scrollByPage = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: 'smooth' });
  };

  return (
    <div className="rail-wrap">
      {canLeft && (
        <button type="button" className="rail-arrow rail-arrow--left" onClick={() => scrollByPage(-1)} aria-label="Scroll left">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
      )}
      <div className="movie-grid movie-rail" ref={scrollerRef} onScroll={update}>
        {items.map((item) => (
          <MovieCard key={item.id} item={item} onSelect={onSelect} />
        ))}
      </div>
      {canRight && (
        <button type="button" className="rail-arrow rail-arrow--right" onClick={() => scrollByPage(1)} aria-label="Scroll right">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      )}
    </div>
  );
}

// layout="rail" (default): one sideways-scrolling row.
// layout="grid": wrapping grid, used for search / browse results.
function Section({ title, items, onSelect, emptyText = 'Nothing to show yet.', loading = false, layout = 'rail' }) {
  if (loading) {
    return (
      <section className="content-section">
        <div className="skeleton-label" />
        <div className="movie-grid" key={title}>
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="content-section">
      <div className="section-label">
        <span className="section-icon">{getIcon(title)}</span>
        {title}
      </div>
      {items.length === 0 ? (
        <div className="empty-box">{emptyText}</div>
      ) : layout === 'grid' ? (
        <div className="movie-grid" key={title}>
          {items.map((item) => (
            <MovieCard key={item.id} item={item} onSelect={onSelect} />
          ))}
        </div>
      ) : (
        <Rail key={title} items={items} onSelect={onSelect} />
      )}
    </section>
  );
}

export default Section;
