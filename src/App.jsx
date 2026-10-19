import { useEffect, useMemo, useState } from 'react';
import { catalog, genres as fallbackGenres, heroItems as fallbackHeroItems } from './data/catalog.js';
import { fetchBrowse, fetchDetails, fetchHomeData, getGenres, isTmdbConfigured } from './services/tmdb.js';
import { fetchAnimeBrowse, fetchAnimeDetails, fetchAnimeHomeData } from './services/anilist.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Section from './components/Section.jsx';
import DetailsPage from './components/DetailsPage.jsx';
import Footer from './components/Footer.jsx';
import ModeTransition from './components/ModeTransition.jsx';

const animeGenres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Sports', 'Supernatural'];
const defaultRoute = { selectedId: null, query: '', activeView: 'home', activeGenre: 'All', animeMode: false };
const emptyAnimeHome = { heroItems: [], suggestions: [], latestAnime: [], popularAnime: [] };
const franchises = ['One Piece', 'Naruto', 'Bleach'];

function routeFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const view = params.get('view') || 'home';
  return { selectedId: params.get('id') || null, query: params.get('q') || '', activeView: ['home', 'movies', 'series', 'genre', 'bigthree'].includes(view) ? view : 'home', activeGenre: params.get('genre') || 'All', animeMode: params.get('mode') === 'anime' };
}

function urlFromRoute(route) {
  const params = new URLSearchParams();
  if (route.selectedId) params.set('id', route.selectedId);
  if (route.animeMode) params.set('mode', 'anime');
  if (route.activeView !== 'home') params.set('view', route.activeView);
  if (route.activeGenre !== 'All') params.set('genre', route.activeGenre);
  if (route.query.trim()) params.set('q', route.query.trim());
  return `${window.location.pathname}${params.size ? `?${params}` : ''}`;
}

function filterCatalog({ query, activeView, activeGenre }) {
  const search = query.trim().toLowerCase();
  let items = [...catalog];
  if (activeView === 'movies') items = items.filter((item) => item.type === 'movie');
  if (activeView === 'series') items = items.filter((item) => item.type === 'series');
  if (activeGenre !== 'All') items = items.filter((item) => item.genre.includes(activeGenre));
  return search ? items.filter((item) => [item.title, item.genre, item.country, item.year, item.description, item.cast?.join(' ')].join(' ').toLowerCase().includes(search)) : items;
}

function App() {
  const initial = routeFromUrl();
  const tmdbReady = isTmdbConfigured();
  const [route, setRoute] = useState(initial);
  const [selectedItem, setSelectedItem] = useState(null);
  const [genreList, setGenreList] = useState(fallbackGenres);
  const [homeData, setHomeData] = useState({ heroItems: fallbackHeroItems, suggestions: catalog.slice(0, 16), latestMovies: catalog.filter((item) => item.type === 'movie').slice(0, 16), latestSeries: catalog.filter((item) => item.type === 'series').slice(0, 16) });
  const [animeHomeData, setAnimeHomeData] = useState(emptyAnimeHome);
  const [browseItems, setBrowseItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState('');
  const [transitioning, setTransitioning] = useState(false);
  const { selectedId, query, activeView, activeGenre, animeMode } = route;
  const displayGenres = animeMode ? animeGenres : genreList;
  const selectedFallback = useMemo(() => animeMode ? null : catalog.find((item) => item.id === selectedId), [animeMode, selectedId]);
  const selected = selectedItem || selectedFallback;

  const applyRoute = (next, push = true) => {
    const normalized = { ...defaultRoute, ...next };
    setRoute(normalized);
    window.history[push ? 'pushState' : 'replaceState'](normalized, '', urlFromRoute(normalized));
  };

  useEffect(() => {
    window.history.replaceState(initial, '', window.location.href);
    const pop = () => { setRoute(routeFromUrl()); window.scrollTo({ top: 0, behavior: 'auto' }); };
    window.addEventListener('popstate', pop);
    return () => window.removeEventListener('popstate', pop);
  }, []);

  useEffect(() => {
    if (tmdbReady) getGenres().then((data) => setGenreList(data.names.length ? data.names : fallbackGenres)).catch(() => setGenreList(fallbackGenres));
  }, [tmdbReady]);

  useEffect(() => {
    if (selectedId) return undefined;
    let active = true;
    setLoading(true); setError('');
    const load = async () => {
      try {
        if (animeMode) {
          if (activeView === 'home' && !query.trim() && activeGenre === 'All') {
            const data = await fetchAnimeHomeData(); if (active) setAnimeHomeData(data);
          } else if (activeView === 'bigthree') {
            const batches = await Promise.all(franchises.map((name) => fetchAnimeBrowse({ query: name })));
            const items = batches.flat().filter((item, index, all) => franchises.some((name) => item.title.toLowerCase().includes(name.toLowerCase())) && all.findIndex((other) => other.id === item.id) === index);
            if (active) setBrowseItems(items);
          } else {
            const items = await fetchAnimeBrowse({ query, activeGenre }); if (active) setBrowseItems(items);
          }
        } else if (!tmdbReady) {
          if (active) { setError('Add VITE_TMDB_API_KEY to your Vercel environment variables to browse the full movie catalog. Showing the included sample titles.'); setBrowseItems(filterCatalog({ query, activeView, activeGenre })); }
        } else if (activeView === 'home' && !query.trim() && activeGenre === 'All') {
          const data = await fetchHomeData(); if (active) setHomeData(data);
        } else {
          const items = await fetchBrowse({ query, activeView, activeGenre }); if (active) setBrowseItems(items);
        }
      } catch (err) {
        if (active) { setError(err.message || 'Could not load title information.'); setBrowseItems(animeMode ? [] : filterCatalog({ query, activeView, activeGenre })); }
      } finally { if (active) setLoading(false); }
    };
    load();
    return () => { active = false; };
  }, [selectedId, query, activeView, activeGenre, animeMode, tmdbReady]);

  useEffect(() => {
    if (!selectedId) { setSelectedItem(null); setDetailsLoading(false); return undefined; }
    setSelectedItem(selectedFallback || null);
    if (!animeMode && (!tmdbReady || !selectedId.startsWith('movie-') && !selectedId.startsWith('series-'))) return undefined;
    let active = true; setDetailsLoading(true); setError('');
    (animeMode ? fetchAnimeDetails(selectedId) : fetchDetails(selectedId))
      .then((item) => { if (active) setSelectedItem(item); })
      .catch((err) => { if (active) setError(err.message || 'Could not load title details.'); })
      .finally(() => { if (active) setDetailsLoading(false); });
    return () => { active = false; };
  }, [selectedId, selectedFallback, animeMode, tmdbReady]);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const goHome = () => { applyRoute({ ...defaultRoute, animeMode }); scrollTop(); };
  const setPage = (view) => { applyRoute({ selectedId: null, query: '', activeView: view, activeGenre: 'All', animeMode }); scrollTop(); };
  const chooseGenre = (genre) => { applyRoute({ selectedId: null, query: '', activeView: genre === 'All' ? 'home' : 'genre', activeGenre: genre, animeMode }); scrollTop(); };
  const openItem = (id) => { applyRoute({ ...route, selectedId: id }); scrollTop(); };
  const search = (value) => { applyRoute({ ...route, selectedId: null, query: value }); scrollTop(); };
  const switchToAnime = () => { applyRoute({ ...defaultRoute, animeMode: true }); scrollTop(); };
  const toggleMode = () => {
    if (transitioning) return;
    if (!animeMode) setTransitioning(true);
    else { applyRoute({ ...defaultRoute, animeMode: false }); scrollTop(); }
  };
  const title = query.trim() ? `Search Results for "${query.trim()}"` : activeView === 'bigthree' ? 'BIG 3: One Piece · Naruto · Bleach' : animeMode ? (activeGenre !== 'All' ? `${activeGenre} Anime` : 'Browse Anime') : activeView === 'movies' ? 'Movies' : activeView === 'series' ? 'TV Series' : activeGenre !== 'All' ? `${activeGenre} Movies & Series` : 'Browse All';
  const isHome = activeView === 'home' && !query.trim() && activeGenre === 'All';

  return <div className={`site-shell${animeMode ? ' anime-mode' : ''}`}>
    {transitioning && <ModeTransition onSwitch={switchToAnime} onDone={() => setTransitioning(false)} />}
    <Header query={query} setQuery={() => {}} onSearch={search} onHome={goHome} onMovies={() => setPage('movies')} onSeries={() => setPage('series')} onGenre={chooseGenre} onBigThree={() => applyRoute({ selectedId: null, query: '', activeView: 'bigthree', activeGenre: 'All', animeMode: true })} genres={displayGenres} onSelect={openItem} animeMode={animeMode} onToggleMode={toggleMode} />
    <main className="main-wrap">
      {error && <div className="setup-note">{error}</div>}
      {selected ? <>{detailsLoading && <div className="loading-box">Loading title information…</div>}<DetailsPage item={selected} onSelect={openItem} onBack={goHome} /></> : isHome ? (animeMode ? <>
        <Hero items={animeHomeData.heroItems} onSelect={openItem} />
        <Section title="Trending Anime" items={animeHomeData.suggestions} onSelect={openItem} loading={loading} />
        <Section title="Latest Anime" items={animeHomeData.latestAnime} onSelect={openItem} loading={loading} />
        <Section title="Popular Anime" items={animeHomeData.popularAnime} onSelect={openItem} loading={loading} />
      </> : <>
        <Hero items={homeData.heroItems} onSelect={openItem} />
        <Section title="Suggestions" items={homeData.suggestions} onSelect={openItem} loading={loading} />
        <Section title="Latest Movies" items={homeData.latestMovies} onSelect={openItem} loading={loading} />
        <Section title="TV Series" items={homeData.latestSeries} onSelect={openItem} loading={loading} />
      </>) : <>
        <div className="browse-hero"><div><p className="eyebrow">JustMovies {animeMode ? 'Anime' : 'Catalog'}</p><h1>{title}</h1><p>{animeMode ? 'Discover your next anime adventure.' : 'Find a movie or series and explore its details.'}</p></div><div className="filter-pills">
          {!animeMode && <><button className={activeView === 'home' ? 'pill active' : 'pill'} onClick={() => setPage('home')}>All</button><button className={activeView === 'movies' ? 'pill active' : 'pill'} onClick={() => setPage('movies')}>Movies</button><button className={activeView === 'series' ? 'pill active' : 'pill'} onClick={() => setPage('series')}>TV Series</button></>}
          <select value={activeGenre} onChange={(event) => chooseGenre(event.target.value)}><option>All</option>{displayGenres.map((genre) => <option key={genre}>{genre}</option>)}</select>
        </div></div>
        <Section layout="grid" title={title} items={browseItems} onSelect={openItem} emptyText={`No ${animeMode ? 'anime' : 'movies or series'} found. Try another search.`} loading={loading} />
      </>}
    </main>
    <Footer onHome={goHome} onMovies={() => setPage('movies')} onSeries={() => setPage('series')} genres={displayGenres.slice(0, 8)} onGenre={chooseGenre} animeMode={animeMode} />
  </div>;
}

export default App;
