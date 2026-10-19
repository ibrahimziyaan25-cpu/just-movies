function Footer({ onHome, onMovies, onSeries, genres, onGenre, animeMode }) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h3>JustMovies {animeMode ? 'Anime' : ''}</h3>
          <button onClick={onHome}>Home</button>
          {animeMode ? <button onClick={() => onGenre('All')}>Anime</button> : <><button onClick={onMovies}>Movies</button><button onClick={onSeries}>TV Series</button></>}
        </div>
        <div>
          <h3>Genres</h3>
          {genres.slice(0, 5).map((genre) => (
            <button key={genre} onClick={() => onGenre(genre)}>{genre}</button>
          ))}
        </div>
        <div>
          <h3>About JustMovies</h3>
          <p>Explore movies, series, and anime. JustMovies is a catalog for discovering titles and learning more about them.</p>
        </div>
        <div className="footer-brand-wrap">
          <div className="brand footer-brand">
            <span className="brand-icon">JM</span>
            <span className="brand-copy">
              <span>Just</span>
              <strong>{animeMode ? 'Anime' : 'Movies'}</strong>
            </span>
          </div>
          <p>© 2026 JustMovies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
