import { useMemo } from 'react';
import { getSuggestions } from '../data/catalog.js';
import Section from './Section.jsx';

function DetailsPage({ item, onSelect, onBack }) {
  const suggestions = useMemo(() => item.recommendations?.length ? item.recommendations : getSuggestions(item.id), [item]);
  const isAnime = item.type === 'anime';
  const seasons = item.seasons || [];

  return <article className="details-page">
    <button className="back-button" onClick={onBack}>← Back to catalog</button>
    <section className="detail-backdrop" style={{ backgroundImage: `url(${item.backdrop || item.poster})` }}>
      <div className="detail-backdrop-shade" />
    </section>
    <section className="info-panel">
      <div className="poster-column"><img src={item.poster} alt={`${item.title} poster`} /></div>
      <div className="info-main">
        <p className="eyebrow">{isAnime ? 'Anime information' : item.type === 'series' ? 'TV series information' : 'Movie information'}</p>
        <h1>{item.title}</h1>
        <p className="description">{item.description || 'No description available yet.'}</p>
        <div className="meta-grid">
          <p><strong>Genre:</strong><span>{item.genre || item.genres?.join(', ') || 'Unknown'}</span></p>
          <p><strong>Format:</strong><span>{isAnime ? item.format || 'Anime' : item.type === 'series' ? 'TV Series' : 'Movie'}</span></p>
          <p><strong>Cast / studio:</strong><span>{item.cast?.join(', ') || 'Not listed'}</span></p>
          <p><strong>{isAnime ? 'Episodes' : 'Duration'}:</strong><span>{isAnime ? item.airedEpisodes || item.episodes || 'Unknown' : item.duration || 'Unknown'}</span></p>
          <p><strong>{item.type === 'series' ? 'Creator' : 'Director / format'}:</strong><span>{item.director || 'Not listed'}</span></p>
          <p><strong>Release:</strong><span>{item.year || 'Unknown'}</span></p>
          <p><strong>Country:</strong><span>{item.country || 'Unknown'}</span></p>
          <p><strong>{isAnime ? 'AniList' : 'TMDb'} rating:</strong><span>★ {item.rating || '—'}</span></p>
          {isAnime && <p><strong>Status:</strong><span>{item.status || 'Unknown'}</span></p>}
          {seasons.length > 0 && <p><strong>Seasons:</strong><span>{seasons.length}</span></p>}
        </div>
      </div>
    </section>
    {seasons.length > 0 && <section className="season-list"><h2>Season information</h2><div className="season-grid">{seasons.map((season) => <article className="season-card" key={season.number}><strong>{season.name || `Season ${season.number}`}</strong><span>{season.episodeCount ? `${season.episodeCount} episodes` : season.episodes?.length ? `${season.episodes.length} episodes listed` : 'Episode count unavailable'}</span>{season.airDate && <span>{season.airDate}</span>}</article>)}</div></section>}
    <section className="keyword-strip"><strong>Tags:</strong><span>#{item.title.toLowerCase().replaceAll(' ', '')}</span><span>#{item.type}</span><span>#{(item.genre || 'catalog').toLowerCase().split(',')[0].trim().replaceAll(' ', '')}</span></section>
    <Section title="You May Also Like" items={suggestions} onSelect={onSelect} />
  </article>;
}

export default DetailsPage;
