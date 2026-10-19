const TYPE_LABEL = { movie: 'Movie', series: 'TV', anime: 'Anime' };

function MovieCard({ item, onSelect }) {
  const ratingNumber = Number(item.rating);
  const rating = Number.isFinite(ratingNumber) && ratingNumber > 0 ? ratingNumber.toFixed(1) : '';
  const year = item.year && item.year !== '—' ? item.year : '';
  const meta = [year, TYPE_LABEL[item.type]].filter(Boolean).join(' · ');

  return (
    <button className="movie-card" onClick={() => onSelect(item.id)} title={item.title}>
      <div className="poster-wrap">
        <img src={item.poster} alt={`${item.title} poster`} loading="lazy" />
        {rating && <span className="card-rating"><span>★</span>{rating}</span>}
        <span className="quality-badge">{item.quality}</span>
        <div className="poster-fade" />
      </div>
      <h3>{item.title}</h3>
      {meta && <p className="card-meta">{meta}</p>}
    </button>
  );
}

export default MovieCard;
