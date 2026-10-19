import { useState, useEffect, useRef } from 'react';
import { fetchBrowse, isTmdbConfigured } from '../services/tmdb.js';
import { getAnimeSuggestions } from '../services/anilist.js';

function Header({ query, setQuery, onSearch, onHome, onMovies, onSeries, onGenre, onBigThree, genres, onSelect, animeMode, onToggleMode }) {
  const [inputValue, setInputValue] = useState(query);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const wrapperRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleSearch = (event) => {
    event.preventDefault();
    setShowDropdown(false);
    setMenuOpen(false);
    setQuery(inputValue);
    onSearch(inputValue);
  };

  useEffect(() => {
    if (!inputValue.trim() || inputValue.trim().length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    if (!animeMode && !isTmdbConfigured()) return;

    const timer = setTimeout(async () => {
      try {
        const items = animeMode
          ? await getAnimeSuggestions(inputValue)
          : await fetchBrowse({ query: inputValue, activeView: 'home', activeGenre: 'All' });
        setSuggestions(items.slice(0, 7));
        setShowDropdown(true);
      } catch {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, animeMode]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (item) => {
    setShowDropdown(false);
    setInputValue('');
    setQuery('');
    setMenuOpen(false);
    onSelect(item.id);
  };

  const navAction = (fn) => {
    setMenuOpen(false);
    fn();
  };

  return (
    <header className={`topbar${scrolled ? ' topbar--scrolled' : ''}`}>
      <div className="topbar-inner">

        {isMobile && (
          <button className="hamburger-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <span /><span /><span />
          </button>
        )}

        {/* Brand / Logo — One Piece Jolly Roger */}
        <button className="brand" onClick={onHome} aria-label="Go to home">
          <span className="brand-emblem">
            {animeMode ? (
              // === ROGER PIRATES emblem — anime mode only ===
              <img 
                id="header-anime-logo"
                src="/roger-logo.png" 
                alt="Roger Pirates Logo" 
                style={{ width: '78px', height: '85px', objectFit: 'contain' }} 
              />
            ) : (
              // === STRAW HAT PIRATES emblem — movie mode only ===
              <img 
                src="/strawhat-logo.png" 
                alt="Straw Hat Logo" 
                style={{ width: '92px', height: '98px', objectFit: 'contain', marginRight: '-6px' }} 
              />
            )}
          </span>

          <span className="brand-copy">
            <span className="brand-sub">Just</span>
            <span className="brand-divider" />
            <strong className="brand-title">{animeMode ? 'Anime' : 'Movies'}</strong>
          </span>
        </button>

        {!isMobile && (
          <nav className="nav-links" aria-label="Main navigation">
            <button onClick={onHome}>Home</button>
            {animeMode ? <button onClick={() => onGenre('All')}>Anime</button> : <><button onClick={onMovies}>Movies <span>▾</span></button><button onClick={onSeries}>TV Series</button></>}
            {animeMode && <button onClick={onBigThree}>BIG 3</button>}
            <div className="nav-dropdown">
              <button>Genres <span>▾</span></button>
              <div className="dropdown-menu">
                {genres.map((genre) => (
                  <button key={genre} onClick={() => onGenre(genre)}>{genre}</button>
                ))}
              </div>
            </div>
          </nav>
        )}

        {!isMobile && (
        <div className="topbar-right">
          <button className="mode-toggle" type="button" onClick={onToggleMode} aria-pressed={animeMode} aria-label={`Switch to ${animeMode ? 'movie' : 'anime'} mode`}>
            <span className="mode-toggle-label">{animeMode ? 'ANIME' : 'MOVIES'}</span>
            <span className="mode-toggle-track"><span className="mode-toggle-thumb">{animeMode ? '✦' : '▶'}</span></span>
          </button>

        <div ref={wrapperRef} style={{ position: 'relative', marginLeft: 'auto', width: 'min(370px, 33vw)' }}>
          <form className="search-form" onSubmit={handleSearch} style={{ width: '100%', marginLeft: 0 }}>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
              placeholder="Search..."
              aria-label={animeMode ? 'Search anime' : 'Search movies and series'}
            />
            <button type="submit" aria-label="Search">⌕</button>
          </form>

          {showDropdown && suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestions.map((item) => (
                <button
                  key={item.id} type="button"
                  onClick={() => handleSuggestionClick(item)}
                  className="search-suggestion"
                >
                  {item.poster ? (
                    <img src={item.poster} alt={item.title} style={{ width: '38px', height: '54px', objectFit: 'cover', borderRadius: '5px', flexShrink: 0, background: '#333' }} />
                  ) : (
                    <div style={{ width: '38px', height: '54px', background: '#2a2a2a', borderRadius: '5px', flexShrink: 0, display: 'grid', placeItems: 'center', fontSize: '18px' }}>🎬</div>
                  )}
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
                    <div className="search-suggestion-meta">
                      {item.type === 'anime' ? (item.duration || 'Anime') : item.type === 'movie' ? 'Movie' : 'TV Show'}
                      {item.year ? ` · ${item.year}` : ''}
                      {item.rating ? ` · ★ ${typeof item.rating === 'number' ? item.rating.toFixed(1) : item.rating}` : ''}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        </div>
        )}
      </div>

      {isMobile && (
        <>
          <div
            className={`side-menu-overlay${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(false)}
          />

          <div className={`side-menu${menuOpen ? ' open' : ''}`}>
            <button className="side-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>

            <div className="side-menu-search-wrap">
              <form className="side-menu-search" onSubmit={handleSearch}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
                  placeholder={animeMode ? 'Search anime' : 'Search movies & TV shows'}
                />
                {inputValue && (
                  <button
                    type="button"
                    className="side-menu-search-clear"
                    aria-label="Clear search"
                    onClick={() => { setInputValue(''); setShowDropdown(false); }}
                  >
                    ✕
                  </button>
                )}
              </form>

              {showDropdown && suggestions.length > 0 && (
                <div className="side-menu-suggestions">
                  {suggestions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="side-menu-suggestion"
                      onClick={() => handleSuggestionClick(item)}
                    >
                      {item.poster ? (
                        <img src={item.poster} alt={item.title} />
                      ) : (
                        <div className="side-menu-suggestion-fallback">🎬</div>
                      )}
                      <div className="side-menu-suggestion-copy">
                        <div className="side-menu-suggestion-title">{item.title}</div>
                        <div className="side-menu-suggestion-meta">
                          {item.type === 'anime' ? (item.duration || 'Anime') : item.type === 'movie' ? 'Movie' : 'TV Show'}
                          {item.year ? ` · ${item.year}` : ''}
                          {item.rating ? ` · ★ ${typeof item.rating === 'number' ? item.rating.toFixed(1) : item.rating}` : ''}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <nav className="side-menu-nav">
              <button onClick={() => navAction(onHome)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                Home
              </button>
              {!animeMode && <button onClick={() => navAction(onMovies)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/></svg>
                Movies
              </button>}
              {!animeMode && <button onClick={() => navAction(onSeries)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/></svg>
                TV Series
              </button>}
              {animeMode && <button onClick={() => navAction(onBigThree)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.3L12 16.5l-6.2 4.5 2.4-7.3L2 9.2h7.6z"/></svg>
                BIG 3
              </button>}

              <button
                className="side-menu-mode-toggle"
                type="button"
                onClick={() => navAction(onToggleMode)}
                aria-pressed={animeMode}
                aria-label={`Switch to ${animeMode ? 'movie' : 'anime'} mode`}
              >
                <span className="side-menu-mode-copy">
                  <span className="side-menu-mode-label">{animeMode ? 'ANIME' : 'MOVIES'}</span>
                  <span className="side-menu-mode-hint">Tap to switch to {animeMode ? 'Movies' : 'Anime'}</span>
                </span>
                <span className="mode-toggle-track"><span className="mode-toggle-thumb">{animeMode ? '✦' : '▶'}</span></span>
              </button>

              <div className="side-menu-divider" />
              <p className="side-menu-section-label">Genres</p>

              {genres.map((genre) => (
                <button key={genre} onClick={() => navAction(() => onGenre(genre))}>
                  {genre}
                </button>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
