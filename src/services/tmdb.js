const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY?.trim();
const API_BASE = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p';
const FALLBACK_POSTER = '/posters/obsession.svg';
const FALLBACK_BACKDROP = '/backdrops/obsession.svg';

let cachedGenres = null;

export function isTmdbConfigured() {
  return Boolean(TMDB_KEY && TMDB_KEY !== 'your_tmdb_api_key_here' && TMDB_KEY !== 'put_your_tmdb_api_key_here');
}

function imageUrl(path, size = 'w500', fallback = FALLBACK_POSTER) {
  return path ? `${IMAGE_BASE}/${size}${path}` : fallback;
}

async function tmdbFetch(path, params = {}) {
  if (!isTmdbConfigured()) {
    throw new Error('TMDb API key missing. Add VITE_TMDB_API_KEY to your Vercel environment variables.');
  }

  const url = new URL(`${API_BASE}${path}`);
  url.searchParams.set('api_key', TMDB_KEY);
  url.searchParams.set('language', params.language || 'en-US');

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`TMDb request failed: ${response.status}`);
  }
  return response.json();
}

export async function getGenres() {
  if (cachedGenres) return cachedGenres;

  const [movie, tv] = await Promise.all([
    tmdbFetch('/genre/movie/list'),
    tmdbFetch('/genre/tv/list')
  ]);

  const movieMap = Object.fromEntries((movie.genres || []).map((genre) => [genre.id, genre.name]));
  const tvMap = Object.fromEntries((tv.genres || []).map((genre) => [genre.id, genre.name]));
  const names = Array.from(new Set([...Object.values(movieMap), ...Object.values(tvMap)])).sort();

  cachedGenres = { movieMap, tvMap, names };
  return cachedGenres;
}

function genreText(item, mediaType, genreData) {
  if (item.genres?.length) return item.genres.map((genre) => genre.name).join(', ');
  const map = mediaType === 'tv' ? genreData?.tvMap : genreData?.movieMap;
  const names = (item.genre_ids || []).map((id) => map?.[id]).filter(Boolean);
  return names.length ? names.join(', ') : 'Unknown';
}

function getCredits(credits) {
  const cast = (credits?.cast || []).slice(0, 6).map((person) => person.name);
  const directors = (credits?.crew || [])
    .filter((person) => person.job === 'Director' || person.job === 'Creator' || person.department === 'Directing')
    .map((person) => person.name);
  const uniqueDirectors = Array.from(new Set(directors)).slice(0, 4);
  return { cast, directors: uniqueDirectors };
}

export function normalizeMedia(item, forcedMediaType, genreData = {}) {
  const mediaType = forcedMediaType || item.media_type;
  if (!['movie', 'tv'].includes(mediaType)) return null;

  const title = mediaType === 'tv' ? item.name : item.title;
  const date = mediaType === 'tv' ? item.first_air_date : item.release_date;
  const year = date ? date.slice(0, 4) : '—';
  const credits = getCredits(item.credits);
  const recommendations = (item.recommendations?.results || [])
    .map((rec) => normalizeMedia(rec, forcedMediaType || rec.media_type, genreData))
    .filter(Boolean)
    .slice(0, 12);

  return {
    id: `${mediaType === 'tv' ? 'series' : 'movie'}-${item.id}`,
    tmdbId: item.id,
    mediaType,
    type: mediaType === 'tv' ? 'series' : 'movie',
    title: title || 'Untitled',
    genre: genreText(item, mediaType, genreData),
    country: item.production_countries?.[0]?.name || item.origin_country?.[0] || 'Unknown',
    year,
    quality: 'HD',
    rating: typeof item.vote_average === 'number' ? item.vote_average.toFixed(1) : '—',
    duration: mediaType === 'tv'
      ? (item.episode_run_time?.[0] ? `${item.episode_run_time[0]} min` : 'TV Series')
      : (item.runtime ? `${item.runtime} min` : 'Movie'),
    poster: imageUrl(item.poster_path, 'w500', FALLBACK_POSTER),
    backdrop: imageUrl(item.backdrop_path, 'original', FALLBACK_BACKDROP),
    description: item.overview || 'No description available yet.',
    cast: credits.cast.length ? credits.cast : ['Cast not listed'],
    director: credits.directors.length ? credits.directors.join(', ') : (mediaType === 'tv' ? 'Creator not listed' : 'Director not listed'),
    recommendations,
    seasons: mediaType === 'tv'
      ? (item.seasons || [])
          .filter((season) => season.season_number >= 0 && season.episode_count > 0)
          .map((season) => ({
            number: season.season_number,
            name: season.name || `Season ${season.season_number}`,
            episodeCount: season.episode_count,
            airDate: season.air_date,
            poster: imageUrl(season.poster_path, 'w342', FALLBACK_POSTER),
            episodes: []
          }))
      : []
  };
}

export async function fetchHomeData() {
  const genreData = await getGenres();
  const [trending, movies, series] = await Promise.all([
    tmdbFetch('/trending/all/week', { page: 1 }),
    tmdbFetch('/movie/now_playing', { page: 1 }),
    tmdbFetch('/tv/on_the_air', { page: 1 })
  ]);

  const suggestions = (trending.results || [])
    .map((item) => normalizeMedia(item, item.media_type, genreData))
    .filter(Boolean)
    .slice(0, 16);

  const latestMovies = (movies.results || [])
    .map((item) => normalizeMedia(item, 'movie', genreData))
    .filter(Boolean)
    .slice(0, 16);

  const latestSeries = (series.results || [])
    .map((item) => normalizeMedia(item, 'tv', genreData))
    .filter(Boolean)
    .slice(0, 16);

  return {
    heroItems: suggestions.slice(0, 5),
    suggestions,
    latestMovies,
    latestSeries
  };
}

function genreIdFromName(map, genreName) {
  if (!genreName || genreName === 'All') return null;
  const found = Object.entries(map || {}).find(([, name]) => name.toLowerCase() === genreName.toLowerCase());
  return found?.[0] || null;
}

export async function fetchBrowse({ query = '', activeView = 'home', activeGenre = 'All' }) {
  const genreData = await getGenres();
  const cleanQuery = query.trim();

  if (cleanQuery) {
    if (activeView === 'movies') {
      const data = await tmdbFetch('/search/movie', { query: cleanQuery, include_adult: false, page: 1 });
      return (data.results || []).map((item) => normalizeMedia(item, 'movie', genreData)).filter(Boolean);
    }
    if (activeView === 'series') {
      const data = await tmdbFetch('/search/tv', { query: cleanQuery, include_adult: false, page: 1 });
      return (data.results || []).map((item) => normalizeMedia(item, 'tv', genreData)).filter(Boolean);
    }
    const data = await tmdbFetch('/search/multi', { query: cleanQuery, include_adult: false, page: 1 });
    return (data.results || [])
      .map((item) => normalizeMedia(item, item.media_type, genreData))
      .filter(Boolean);
  }

  if (activeView === 'movies') {
    const movieGenre = genreIdFromName(genreData.movieMap, activeGenre);
    const data = await tmdbFetch('/discover/movie', {
      sort_by: 'popularity.desc',
      include_adult: false,
      page: 1,
      with_genres: movieGenre
    });
    return (data.results || []).map((item) => normalizeMedia(item, 'movie', genreData)).filter(Boolean);
  }

  if (activeView === 'series') {
    const tvGenre = genreIdFromName(genreData.tvMap, activeGenre);
    const data = await tmdbFetch('/discover/tv', {
      sort_by: 'popularity.desc',
      include_adult: false,
      page: 1,
      with_genres: tvGenre
    });
    return (data.results || []).map((item) => normalizeMedia(item, 'tv', genreData)).filter(Boolean);
  }

  if (activeGenre !== 'All') {
    const movieGenre = genreIdFromName(genreData.movieMap, activeGenre);
    const tvGenre = genreIdFromName(genreData.tvMap, activeGenre);
    const [movies, series] = await Promise.all([
      movieGenre ? tmdbFetch('/discover/movie', { sort_by: 'popularity.desc', include_adult: false, with_genres: movieGenre, page: 1 }) : Promise.resolve({ results: [] }),
      tvGenre ? tmdbFetch('/discover/tv', { sort_by: 'popularity.desc', include_adult: false, with_genres: tvGenre, page: 1 }) : Promise.resolve({ results: [] })
    ]);
    return [
      ...(movies.results || []).map((item) => normalizeMedia(item, 'movie', genreData)),
      ...(series.results || []).map((item) => normalizeMedia(item, 'tv', genreData))
    ].filter(Boolean);
  }

  const data = await tmdbFetch('/trending/all/week', { page: 1 });
  return (data.results || [])
    .map((item) => normalizeMedia(item, item.media_type, genreData))
    .filter(Boolean);
}

export async function fetchDetails(mediaKey) {
  const genreData = await getGenres();
  const [kind, id] = mediaKey.split('-');
  const mediaType = kind === 'series' ? 'tv' : 'movie';
  const data = await tmdbFetch(`/${mediaType}/${id}`, {
    append_to_response: 'credits,recommendations'
  });
  return normalizeMedia(data, mediaType, genreData);
}

