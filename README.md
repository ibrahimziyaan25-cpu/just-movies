# JustMovies

JustMovies is an information catalog for movies, TV series, and anime. It shows title details and recommendations without video playback or streaming servers.

## Run locally

Install dependencies with `npm install`, then start the Vite development server with `npm run dev`.

To browse current movie and TV metadata, add your TMDb key as `VITE_TMDB_API_KEY` in `.env` for local development or in the Vercel project environment variables for deployment. Movie and TV data loads directly from TMDb and updates as TMDb's catalog changes. Anime information comes from AniList.

In Vercel, add `VITE_TMDB_API_KEY` for Production and Preview, then redeploy. Vite includes `VITE_` variables in browser code, so this setup makes the TMDb key visible to site visitors.
