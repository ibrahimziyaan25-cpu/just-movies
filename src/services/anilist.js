const ANILIST_ENDPOINT = 'https://graphql.anilist.co';
const FALLBACK_POSTER = '/posters/obsession.svg';
const FALLBACK_BACKDROP = '/backdrops/obsession.svg';

const MEDIA_FIELDS = `
  id
  idMal
  title { english romaji native }
  description(asHtml: false)
  bannerImage
  coverImage { large }
  episodes
  duration
  format
  status
  genres
  averageScore
  seasonYear
  countryOfOrigin
  nextAiringEpisode { episode airingAt }
  studios(isMain: true) { nodes { name } }
  relations { edges { relationType node { id title { english romaji } format coverImage { large } } } }
`;

// ── Rate-limit-safe fetch with retry ──────────────────────────────────────
let lastRequestTime = 0;
const MIN_REQUEST_GAP = 800; // ms between requests

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function anilistFetch(query, variables = {}, retriesLeft = 2) {
  // Throttle: ensure minimum gap between requests
  const now = Date.now();
  const wait = lastRequestTime + MIN_REQUEST_GAP - now;
  if (wait > 0) await sleep(wait);
  lastRequestTime = Date.now();

  const response = await fetch(ANILIST_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ query, variables })
  });

  // Handle rate limiting (429) with retry
  if (response.status === 429) {
    if (retriesLeft > 0) {
      const retryAfter = Number(response.headers.get('retry-after')) || 2;
      await sleep(retryAfter * 1000);
      return anilistFetch(query, variables, retriesLeft - 1);
    }
    throw new Error('AniList is rate-limiting requests right now. Please wait a few seconds and refresh.');
  }

  if (!response.ok) throw new Error(`AniList request failed: ${response.status}`);
  const payload = await response.json();
  if (payload.errors?.length) throw new Error(payload.errors[0].message || 'AniList could not load anime.');
  return payload.data;
}

function cleanDescription(description) {
  return (description || 'No description available yet.')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

export function normalizeAnime(media) {
  if (!media) return null;
  const title = media.title?.english || media.title?.romaji || media.title?.native || 'Untitled Anime';
  const related = (media.relations?.edges || [])
    .filter(({ node }) => node?.format && node.format !== 'MANGA')
    .map(({ node }) => ({
      id: `anime-${node.id}`,
      type: 'anime',
      title: node.title?.english || node.title?.romaji || 'Related anime',
      poster: node.coverImage?.large || FALLBACK_POSTER,
      backdrop: node.coverImage?.large || FALLBACK_BACKDROP,
      quality: 'HD',
      year: '—',
      rating: '—',
      genre: 'Anime'
    }))
    .filter((item, index, all) => all.findIndex((other) => other.id === item.id) === index)
    .slice(0, 12);

  return {
    id: `anime-${media.id}`,
    anilistId: media.id,
    malId: media.idMal || null,
    type: 'anime',
    mediaType: 'anime',
    title,
    // media.episodes is AniList's *total planned* count — it's null for
    // long-running/ongoing shows (One Piece, etc.) because the total isn't
    // known yet. nextAiringEpisode is what actually stays current: it's the
    // next episode number due to air, so (episode - 1) is how many have
    // actually aired so far. Prefer that for ongoing shows.
    nextAiringEpisode: media.nextAiringEpisode || null,
    airedEpisodes: media.nextAiringEpisode?.episode
      ? media.nextAiringEpisode.episode - 1
      : (media.episodes || null),
    episodes: media.episodes || 1,
    genre: media.genres?.length ? media.genres.join(', ') : 'Anime',
    genres: media.genres || [],
    country: media.countryOfOrigin || 'Japan',
    year: media.seasonYear || '—',
    quality: 'HD',
    rating: media.averageScore ? (media.averageScore / 10).toFixed(1) : '—',
    duration: media.episodes ? `${media.episodes} episodes${media.duration ? ` · ${media.duration} min` : ''}` : (media.format || 'Anime'),
    poster: media.coverImage?.large || FALLBACK_POSTER,
    backdrop: media.bannerImage || media.coverImage?.large || FALLBACK_BACKDROP,
    description: cleanDescription(media.description),
    cast: media.studios?.nodes?.map((studio) => studio.name).slice(0, 3) || ['Studio not listed'],
    director: media.format || 'Anime',
    status: media.status?.replaceAll('_', ' ') || 'Unknown',
    recommendations: related,
    seasons: []
  };
}

const pageQuery = `query ($page: Int, $perPage: Int, $search: String, $genre: String, $sort: [MediaSort]) {
  Page(page: $page, perPage: $perPage) {
    media(search: $search, genre: $genre, type: ANIME, sort: $sort, isAdult: false) { ${MEDIA_FIELDS} }
  }
}`;

// ── Home data — ONE combined request instead of 3 parallel ones ──────────
const homeQuery = `query {
  trending: Page(page: 1, perPage: 18) {
    media(sort: TRENDING_DESC, type: ANIME, isAdult: false) { ${MEDIA_FIELDS} }
  }
  popular: Page(page: 1, perPage: 18) {
    media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) { ${MEDIA_FIELDS} }
  }
  recent: Page(page: 1, perPage: 18) {
    media(sort: UPDATED_AT_DESC, type: ANIME, isAdult: false) { ${MEDIA_FIELDS} }
  }
}`;

let homeCache = null;
let homeCacheTime = 0;
const HOME_CACHE_MS = 5 * 60 * 1000; // 5 min cache

export async function fetchAnimeHomeData() {
  // Serve from cache if fresh (avoids re-fetching on every re-render / hot reload)
  if (homeCache && Date.now() - homeCacheTime < HOME_CACHE_MS) {
    return homeCache;
  }

  const data = await anilistFetch(homeQuery);
  const toItems = (media) => (media || []).map(normalizeAnime).filter(Boolean);

  const trendingItems = toItems(data.trending?.media);
  const result = {
    heroItems: trendingItems.slice(0, 5),
    suggestions: trendingItems,
    latestAnime: toItems(data.recent?.media),
    popularAnime: toItems(data.popular?.media)
  };

  homeCache = result;
  homeCacheTime = Date.now();
  return result;
}

export async function fetchAnimeBrowse({ query = '', activeGenre = 'All' } = {}) {
  const data = await anilistFetch(pageQuery, {
    page: 1,
    perPage: 30,
    search: query.trim() || undefined,
    genre: activeGenre !== 'All' ? activeGenre : undefined,
    sort: query.trim() ? ['SEARCH_MATCH'] : ['POPULARITY_DESC']
  });
  return (data.Page?.media || []).map(normalizeAnime).filter(Boolean);
}

export async function fetchAnimeDetails(mediaKey) {
  const id = Number(String(mediaKey).replace('anime-', ''));
  if (!Number.isFinite(id)) throw new Error('Invalid anime ID.');
  const data = await anilistFetch(
    `query ($id: Int) { Media(id: $id, type: ANIME) { ${MEDIA_FIELDS} } }`,
    { id }
  );
  return normalizeAnime(data.Media);
}

export async function getAnimeSuggestions(search) {
  if (!search?.trim()) return [];
  return fetchAnimeBrowse({ query: search });
}
