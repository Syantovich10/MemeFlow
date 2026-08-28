# YouTube Search MVP Design

## Goal

Turn the existing static ShortFinder interface into a working MVP that searches YouTube by keywords, displays only videos up to 180 seconds long, and stores favorites locally without accounts or a database.

## Approved Scope

- Real keyword search through YouTube Data API v3.
- Search results limited to videos with a duration of 180 seconds or less.
- Search state represented in the `/search` URL.
- Favorites stored in browser `localStorage`.
- Existing routes remain `/`, `/search`, and `/favorites`.
- Existing visual design and component conventions remain in place.
- No AI or semantic search.
- No authentication, database, video ingestion, or deployment work.
- No automated tests in this MVP.

## Architecture

The browser sends search requests to a Next.js Route Handler at `/api/videos/search`. The handler owns the YouTube integration so `YOUTUBE_API_KEY` remains server-only. It obtains candidate videos from `search.list`, fetches durations and statistics from `videos.list`, removes items longer than 180 seconds, and maps the remaining records into the application's `VideoItem` type.

The `/search` page stores its public search state in query parameters. Query strings are read and created with `URLSearchParams`; code must not concatenate query strings manually. A representative URL is `/search?q=funny+cat&category=cats&pageToken=...`.

Favorites are stored as normalized `VideoItem` objects in `localStorage`. The favorites implementation is client-only and gracefully replaces malformed stored data with an empty collection.

## Project Boundaries

```text
src/
├── app/
│   ├── page.tsx
│   ├── search/page.tsx
│   ├── favorites/page.tsx
│   └── api/videos/search/route.ts
├── views/
│   ├── home/
│   ├── search/
│   └── favorites/
├── components/
│   ├── UI/
│   └── Layout/
├── services/
│   ├── YouTube/
│   └── Favorites/
├── constants/
├── types/
└── lib/
```

- Files in `app` only define framework entry points and the API handler.
- Files in `views` compose complete route screens.
- `components/UI` contains only generic, stateless shadcn primitives.
- `components/Layout` contains product-specific composed blocks and the minimum client logic needed for interaction.
- `services/YouTube` contains server-only YouTube requests, response mapping, and duration filtering.
- `services/Favorites` contains browser storage operations.
- `constants` contains categories, the 180-second limit, request limits, and the local-storage key.
- `types` contains application models and API response contracts.
- Component folders under `UI` and `Layout` use PascalCase.
- Barrel files named `index.ts` are not introduced.

## Data Model

`VideoItem` is the only video shape consumed by views and components. It contains:

- `id`: YouTube video ID as a string.
- `title`: video title.
- `creator`: channel title.
- `channelId`: channel ID.
- `views`: numeric view count when available.
- `durationSeconds`: parsed duration in seconds.
- `thumbnailUrl`: selected YouTube thumbnail URL.
- `publishedAt`: ISO publication timestamp.
- `youtubeUrl`: canonical watch URL.

YouTube response types remain internal to `services/YouTube` and are never passed to UI components.

## API Contract

`GET /api/videos/search` accepts:

- `q`: required trimmed search phrase.
- `category`: optional application category identifier.
- `pageToken`: optional YouTube pagination token.

A successful response contains:

```json
{
  "items": [],
  "nextPageToken": null,
  "totalResults": 0
}
```

Errors use a stable application shape:

```json
{
  "error": {
    "code": "INVALID_QUERY",
    "message": "Enter a search phrase."
  }
}
```

Supported error codes are `INVALID_QUERY`, `MISSING_API_KEY`, `YOUTUBE_QUOTA_EXCEEDED`, `YOUTUBE_UNAVAILABLE`, and `INTERNAL_ERROR`. Secrets and raw upstream responses are not returned to the browser.

## User Flows

### Search

1. The user enters a phrase on the home or search page.
2. Submission navigates to `/search?q=...`.
3. The search layout reads the URL through `URLSearchParams`.
4. It creates the API request query through a separate `URLSearchParams` instance.
5. The page displays the existing skeleton while the request is pending.
6. The page displays results, the existing empty state, or a retryable error state.
7. Pagination updates `pageToken` in the page URL and preserves the other parameters.

### Favorites

1. A video card or preview action adds the normalized video to favorites.
2. Adding the same ID twice has no effect.
3. A favorited video can be removed from the card or favorites page.
4. `/favorites` reads the stored collection and displays the existing grid or empty state.
5. Favorites persist across page refreshes in the same browser.

## Error Handling

- An empty query is rejected before contacting YouTube.
- A missing server API key produces a configuration error without exposing environment details.
- YouTube quota exhaustion produces a distinct user-facing message.
- Network and upstream failures show a retry action.
- A valid response with no videos at or below 180 seconds shows `EmptySearchResults`.
- Invalid `localStorage` JSON is discarded and replaced with an empty array.

## Verification

The MVP intentionally has no automated test suite. Every implementation slice must still be checked with the smallest relevant combination of:

- `npm run lint`.
- `npm run build`.
- Manual search with valid, empty, and no-result phrases.
- Manual verification that returned videos do not exceed 180 seconds.
- Manual add, duplicate-add, refresh, and remove checks for favorites.
- Manual checks of `/`, `/search`, and `/favorites` on mobile and desktop widths.

## Completion Criteria

The MVP is complete when a user can search YouTube from the existing interface, share or reload the results URL without losing the query, see only videos no longer than three minutes, save and remove favorites locally, and receive understandable loading, empty, and error states. Lint and the production build must pass.
