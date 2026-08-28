# YouTube Search MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing static ShortFinder frontend into a working keyword-search MVP backed by YouTube Data API, with a strict three-minute duration limit and browser-local favorites.

**Architecture:** Keep Next.js route files thin and compose screens in `views`. A server-only YouTube service sits behind `GET /api/videos/search`; client workspaces in `components/Layout` own the minimum interaction state, while `components/UI` remains stateless shadcn primitives. Search state is encoded with `URLSearchParams`, and favorites are persisted through a small `localStorage` service.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, shadcn/Base UI, native `fetch`, YouTube Data API v3, browser `localStorage`.

## Global Constraints

- Search is keyword-based; AI and semantic indexing are out of scope.
- Only videos with `durationSeconds <= 180` may reach the UI.
- `YOUTUBE_API_KEY` is server-only and must never be prefixed with `NEXT_PUBLIC_`.
- Search state uses `/search?q=...&category=...&pageToken=...`.
- All query strings are read or built with `URLSearchParams`; no manual query-string concatenation.
- Favorites are stored locally without accounts or a database.
- `components/UI` stays generic and stateless; product logic belongs in `components/Layout`.
- Component folders under `UI` and `Layout` use PascalCase.
- Do not introduce `index.ts` barrel files.
- Do not add an automated test framework or test files.
- Each task is verified with lint, build, a focused manual check, or a combination of them.

## Target File Map

```text
frontend/
├── .env.example
├── README.md
├── next.config.ts
└── src/
    ├── app/
    │   ├── api/videos/search/route.ts
    │   ├── favorites/page.tsx
    │   └── search/page.tsx
    ├── components/
    │   └── Layout/
    │       ├── CategoryFilters/CategoryFilters.tsx
    │       ├── FavoritesWorkspace/FavoritesWorkspace.tsx
    │       ├── PaginationControls/PaginationControls.tsx
    │       ├── PopularSearches/PopularSearches.tsx
    │       ├── SearchControls/SearchControls.tsx
    │       ├── SearchForm/SearchForm.tsx
    │       ├── SearchResults/SearchResults.tsx
    │       ├── SearchStates/SearchStates.tsx
    │       ├── SearchWorkspace/SearchWorkspace.tsx
    │       └── VideoCard/VideoCard.tsx
    ├── constants/
    │   ├── search.ts
    │   └── storage.ts
    ├── lib/
    │   ├── format-video.ts
    │   └── search-params.ts
    ├── services/
    │   ├── Favorites/favorites-storage.ts
    │   └── YouTube/
    │       ├── parse-youtube-duration.ts
    │       ├── search-youtube-videos.ts
    │       └── youtube-types.ts
    ├── types/
    │   ├── search.ts
    │   └── video.ts
    └── views/
        ├── favorites/favorites-view.tsx
        ├── home/home-view.tsx
        └── search/search-view.tsx
```

---

### Task 1: Prepare the environment and stable application contracts

**Deliverable:** The project has a documented server key, stable video/search types, YouTube image support, and formatting helpers while the current static screens still build.

**Files:**
- Create: `frontend/.env.example`
- Create: `frontend/src/types/search.ts`
- Create: `frontend/src/lib/format-video.ts`
- Modify: `frontend/src/types/video.ts`
- Modify: `frontend/src/constants/videos.ts`
- Modify: `frontend/src/components/Layout/VideoCard/VideoCard.tsx`
- Modify: `frontend/next.config.ts`

**Interfaces:**
- Produces: `VideoItem`, `SearchVideosParams`, `SearchVideosResponse`, `SearchApiError`, `formatDuration(seconds)`, and `formatViewCount(views)`.
- Consumes: Existing `videos` fixture and `VideoCard` markup.

- [ ] **Step 1: Add the environment template**

```dotenv
# Server-only YouTube Data API v3 key.
YOUTUBE_API_KEY=
```

- [ ] **Step 2: Replace the application video model**

```ts
export type VideoItem = {
  id: string
  title: string
  creator: string
  channelId: string
  views: number | null
  durationSeconds: number
  thumbnailUrl: string
  publishedAt: string
  youtubeUrl: string
}
```

- [ ] **Step 3: Add the public search contracts**

```ts
import type { SearchCategoryId } from "@/constants/search"
import type { VideoItem } from "@/types/video"

export type SearchVideosParams = {
  query: string
  category?: SearchCategoryId
  pageToken?: string
}

export type SearchVideosResponse = {
  items: VideoItem[]
  nextPageToken: string | null
  totalResults: number
}

export type SearchErrorCode =
  | "INVALID_QUERY"
  | "MISSING_API_KEY"
  | "YOUTUBE_QUOTA_EXCEEDED"
  | "YOUTUBE_UNAVAILABLE"
  | "INTERNAL_ERROR"

export type SearchApiError = {
  error: {
    code: SearchErrorCode
    message: string
  }
}
```

- [ ] **Step 4: Add presentation formatters**

```ts
export function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

export function formatViewCount(views: number | null) {
  if (views === null) return "Views unavailable"

  return `${new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(views)} views`
}
```

- [ ] **Step 5: Keep the existing fixture compatible during migration**

Rename the current `export const videos: VideoItem[] = [...]` declaration to `const legacyVideos = [...]` while preserving all twelve existing objects exactly. Then append this normalization code below that array:

```ts
function clockToSeconds(value: string) {
  const [minutes, seconds] = value.split(":").map(Number)
  return minutes * 60 + seconds
}

export const videos: VideoItem[] = legacyVideos.map((video) => ({
  id: String(video.id),
  title: video.title,
  creator: video.creator,
  channelId: `fixture-channel-${video.id}`,
  views: null,
  durationSeconds: clockToSeconds(video.duration),
  thumbnailUrl: video.image,
  publishedAt: "",
  youtubeUrl: "https://www.youtube.com/",
}))
```

- [ ] **Step 6: Switch `VideoCard` to the normalized fields**

Replace `video.image`, `video.duration`, and the preformatted `video.views` with:

```tsx
<Image src={video.thumbnailUrl} alt="" fill />
<Badge>{formatDuration(video.durationSeconds)}</Badge>
<CardDescription>{formatViewCount(video.views)}</CardDescription>
```

Preserve the existing responsive image sizes and visual classes around those values.

- [ ] **Step 7: Allow YouTube thumbnails in `next/image`**

Add this entry to `images.remotePatterns` without removing the existing Unsplash entry:

```ts
{
  protocol: "https",
  hostname: "i.ytimg.com",
}
```

- [ ] **Step 8: Verify the migration slice**

Run from `frontend`:

```powershell
npm run lint
npm run build
```

Expected: both commands exit with code `0`; `/`, `/search`, and `/favorites` remain listed as valid routes.

- [ ] **Step 9: Commit the slice**

```powershell
git add frontend/.env.example frontend/next.config.ts frontend/src/types frontend/src/lib/format-video.ts frontend/src/constants/videos.ts frontend/src/components/Layout/VideoCard/VideoCard.tsx
git commit -m "refactor: normalize video contracts"
```

---

### Task 2: Add YouTube response types and duration parsing

**Deliverable:** Internal YouTube data can be typed and ISO 8601 durations can be converted to seconds without leaking upstream types into components.

**Files:**
- Create: `frontend/src/services/YouTube/youtube-types.ts`
- Create: `frontend/src/services/YouTube/parse-youtube-duration.ts`

**Interfaces:**
- Produces: `YouTubeSearchResponse`, `YouTubeVideosResponse`, and `parseYouTubeDuration(value): number | null`.
- Consumes: No application UI code.

- [ ] **Step 1: Define only the YouTube fields the MVP reads**

```ts
export type YouTubeThumbnail = {
  url: string
  width?: number
  height?: number
}

export type YouTubeSnippet = {
  title: string
  channelId: string
  channelTitle: string
  publishedAt: string
  thumbnails: {
    default?: YouTubeThumbnail
    medium?: YouTubeThumbnail
    high?: YouTubeThumbnail
  }
}

export type YouTubeSearchResponse = {
  nextPageToken?: string
  pageInfo?: { totalResults?: number }
  items?: Array<{
    id?: { videoId?: string }
    snippet?: YouTubeSnippet
  }>
  error?: { code?: number; message?: string; errors?: Array<{ reason?: string }> }
}

export type YouTubeVideosResponse = {
  items?: Array<{
    id?: string
    snippet?: YouTubeSnippet
    contentDetails?: { duration?: string }
    statistics?: { viewCount?: string }
  }>
  error?: { code?: number; message?: string; errors?: Array<{ reason?: string }> }
}
```

- [ ] **Step 2: Parse ISO 8601 durations defensively**

```ts
const durationPattern = /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/

export function parseYouTubeDuration(value: string) {
  const match = durationPattern.exec(value)
  if (!match) return null

  const [, days = "0", hours = "0", minutes = "0", seconds = "0"] = match

  return (
    Number(days) * 86_400 +
    Number(hours) * 3_600 +
    Number(minutes) * 60 +
    Number(seconds)
  )
}
```

- [ ] **Step 3: Run the focused static check**

```powershell
npm run lint
```

Expected: exit code `0` with no ESLint errors.

- [ ] **Step 4: Commit the slice**

```powershell
git add frontend/src/services/YouTube
git commit -m "feat: add youtube response parsing"
```

---

### Task 3: Implement the server-only YouTube search service

**Deliverable:** One server function performs the two YouTube calls, maps the results, and guarantees the 180-second limit.

**Files:**
- Modify: `frontend/src/constants/search.ts`
- Create: `frontend/src/services/YouTube/search-youtube-videos.ts`

**Interfaces:**
- Consumes: `SearchVideosParams`, YouTube response types, and `parseYouTubeDuration`.
- Produces: `searchYouTubeVideos(params): Promise<SearchVideosResponse>` and `YouTubeServiceError`.

- [ ] **Step 1: Add service constants and category search terms**

Extend each existing category with `queryTerm` and add exact request limits:

```ts
export const MAX_VIDEO_DURATION_SECONDS = 180
export const YOUTUBE_SEARCH_CANDIDATE_LIMIT = 50

export const searchCategories = [
  { id: "all", label: "All", queryTerm: "" },
  { id: "trending", label: "Trending", queryTerm: "trending" },
  { id: "mellstroy", label: "Mellstroy", queryTerm: "mellstroy" },
  { id: "cats", label: "Cats", queryTerm: "cats" },
  { id: "memes", label: "Memes", queryTerm: "memes" },
  { id: "gaming", label: "Gaming", queryTerm: "gaming" },
  { id: "streamers", label: "Streamers", queryTerm: "streamers" },
] as const
```

- [ ] **Step 2: Define a typed service error**

```ts
export class YouTubeServiceError extends Error {
  constructor(
    public readonly code: "MISSING_API_KEY" | "YOUTUBE_QUOTA_EXCEEDED" | "YOUTUBE_UNAVAILABLE",
    public readonly status: number,
    message: string,
  ) {
    super(message)
    this.name = "YouTubeServiceError"
  }
}
```

Add a complete server-key guard and call it at the start of `searchYouTubeVideos`:

```ts
function getYouTubeApiKey() {
  const apiKey = process.env.YOUTUBE_API_KEY?.trim()

  if (!apiKey) {
    throw new YouTubeServiceError(
      "MISSING_API_KEY",
      500,
      "YouTube search is not configured.",
    )
  }

  return apiKey
}
```

- [ ] **Step 3: Build the effective keyword query**

```ts
function buildEffectiveQuery(query: string, category?: SearchCategoryId) {
  const categoryTerm = searchCategories.find((item) => item.id === category)?.queryTerm
  return [query.trim(), categoryTerm].filter(Boolean).join(" ")
}
```

- [ ] **Step 4: Fetch candidates with `search.list`**

Build the URL exclusively through `URL` and `URLSearchParams`:

```ts
const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search")
searchUrl.search = new URLSearchParams({
  key: apiKey,
  part: "snippet",
  type: "video",
  q: buildEffectiveQuery(params.query, params.category),
  maxResults: String(YOUTUBE_SEARCH_CANDIDATE_LIMIT),
  videoDuration: "short",
  safeSearch: "moderate",
  ...(params.pageToken ? { pageToken: params.pageToken } : {}),
}).toString()
```

Parse the response as `YouTubeSearchResponse` and collect only defined `videoId` values.

- [ ] **Step 5: Fetch exact duration and statistics with `videos.list`**

```ts
const detailsUrl = new URL("https://www.googleapis.com/youtube/v3/videos")
detailsUrl.search = new URLSearchParams({
  key: apiKey,
  part: "snippet,contentDetails,statistics",
  id: videoIds.join(","),
}).toString()
```

Skip the second request and return an empty page when `videoIds` is empty.

- [ ] **Step 6: Normalize and enforce the exact limit**

```ts
const items = (details.items ?? []).flatMap((item) => {
  const durationSeconds = item.contentDetails?.duration
    ? parseYouTubeDuration(item.contentDetails.duration)
    : null
  const thumbnailUrl =
    item.snippet?.thumbnails.high?.url ??
    item.snippet?.thumbnails.medium?.url ??
    item.snippet?.thumbnails.default?.url

  if (
    !item.id ||
    !item.snippet ||
    !thumbnailUrl ||
    durationSeconds === null ||
    durationSeconds > MAX_VIDEO_DURATION_SECONDS
  ) {
    return []
  }

  const parsedViews = Number(item.statistics?.viewCount)

  return [{
    id: item.id,
    title: item.snippet.title,
    creator: item.snippet.channelTitle,
    channelId: item.snippet.channelId,
    views: Number.isSafeInteger(parsedViews) ? parsedViews : null,
    durationSeconds,
    thumbnailUrl,
    publishedAt: item.snippet.publishedAt,
    youtubeUrl: `https://www.youtube.com/watch?v=${encodeURIComponent(item.id)}`,
  }]
})
```

Return `totalResults: items.length` because upstream totals include candidates removed by the 180-second filter.

- [ ] **Step 7: Convert upstream failures to stable service errors**

Treat `quotaExceeded` and `dailyLimitExceeded` reasons as `YOUTUBE_QUOTA_EXCEEDED` with HTTP `429`; treat other non-OK responses and network failures as `YOUTUBE_UNAVAILABLE` with HTTP `502`. Never include the API key or the full upstream payload in an error message.

- [ ] **Step 8: Verify the server module**

```powershell
npm run lint
npm run build
```

Expected: both commands exit with code `0`; no client bundle reports a server-only environment access.

- [ ] **Step 9: Commit the slice**

```powershell
git add frontend/src/constants/search.ts frontend/src/services/YouTube
git commit -m "feat: implement youtube search service"
```

---

### Task 4: Expose the search Route Handler

**Deliverable:** The browser can call a stable application endpoint without seeing the YouTube key or upstream response shape.

**Files:**
- Create: `frontend/src/app/api/videos/search/route.ts`

**Interfaces:**
- Consumes: `searchYouTubeVideos({ query, category, pageToken })`.
- Produces: `GET /api/videos/search?q=&category=&pageToken=` returning `SearchVideosResponse | SearchApiError`.

- [ ] **Step 1: Read and validate URL parameters**

```ts
import { NextResponse, type NextRequest } from "next/server"

import { searchCategories, type SearchCategoryId } from "@/constants/search"
import {
  searchYouTubeVideos,
  YouTubeServiceError,
} from "@/services/YouTube/search-youtube-videos"

const categoryIds = new Set(searchCategories.map((category) => category.id))

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? ""
  const rawCategory = request.nextUrl.searchParams.get("category") ?? "all"
  const pageToken = request.nextUrl.searchParams.get("pageToken")?.trim() || undefined

  if (!query) {
    return NextResponse.json(
      { error: { code: "INVALID_QUERY", message: "Enter a search phrase." } },
      { status: 400 },
    )
  }

  const category = categoryIds.has(rawCategory as SearchCategoryId)
    ? (rawCategory as SearchCategoryId)
    : "all"
```

- [ ] **Step 2: Return normalized success and error responses**

Complete the handler with:

```ts
  try {
    const result = await searchYouTubeVideos({ query, category, pageToken })
    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof YouTubeServiceError) {
      return NextResponse.json(
        { error: { code: error.code, message: error.message } },
        { status: error.status },
      )
    }

    console.error("Unexpected video search failure", error)
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to search videos right now." } },
      { status: 500 },
    )
  }
}
```

- [ ] **Step 3: Check invalid input without an API key**

Start the app and request:

```powershell
Invoke-WebRequest -Uri 'http://localhost:3000/api/videos/search?q=' -SkipHttpErrorCheck | Select-Object StatusCode, Content
```

Expected: status `400` and error code `INVALID_QUERY`.

- [ ] **Step 4: Check missing-key behavior**

```powershell
Invoke-WebRequest -Uri 'http://localhost:3000/api/videos/search?q=cats' -SkipHttpErrorCheck | Select-Object StatusCode, Content
```

Expected: a non-2xx response with error code `MISSING_API_KEY`; the response must not contain an environment path or key value.

- [ ] **Step 5: Run static verification**

```powershell
npm run lint
npm run build
```

Expected: both commands exit with code `0`; `/api/videos/search` appears as a dynamic route.

- [ ] **Step 6: Commit the slice**

```powershell
git add frontend/src/app/api/videos/search/route.ts
git commit -m "feat: expose video search api"
```

---

### Task 5: Make all search navigation URL-driven

**Deliverable:** Home search, category filters, popular searches, refresh, and browser navigation preserve the search state through URL parameters.

**Files:**
- Create: `frontend/src/lib/search-params.ts`
- Modify: `frontend/src/components/Layout/SearchForm/SearchForm.tsx`
- Modify: `frontend/src/components/Layout/SearchControls/SearchControls.tsx`
- Modify: `frontend/src/components/Layout/CategoryFilters/CategoryFilters.tsx`
- Modify: `frontend/src/components/Layout/PopularSearches/PopularSearches.tsx`

**Interfaces:**
- Produces: `SearchUrlState`, `readSearchUrlState(value)`, `createSearchHref(state)`, and `createSearchApiUrl(state)`.
- Consumes: Existing search controls and `SearchCategoryId`.

- [ ] **Step 1: Centralize reading and building search parameters**

```ts
import { searchCategories, type SearchCategoryId } from "@/constants/search"

export type SearchUrlState = {
  query: string
  category: SearchCategoryId
  pageToken?: string
}

const categoryIds = new Set(searchCategories.map((category) => category.id))

export function readSearchUrlState(params: URLSearchParams): SearchUrlState {
  const rawCategory = params.get("category") ?? "all"

  return {
    query: params.get("q")?.trim() ?? "",
    category: categoryIds.has(rawCategory as SearchCategoryId)
      ? (rawCategory as SearchCategoryId)
      : "all",
    pageToken: params.get("pageToken")?.trim() || undefined,
  }
}

function createParams(state: SearchUrlState) {
  const params = new URLSearchParams()
  if (state.query) params.set("q", state.query)
  if (state.category !== "all") params.set("category", state.category)
  if (state.pageToken) params.set("pageToken", state.pageToken)
  return params
}

export function createSearchHref(state: SearchUrlState) {
  const query = createParams(state).toString()
  return query ? `/search?${query}` : "/search"
}

export function createSearchApiUrl(state: SearchUrlState) {
  const query = createParams(state).toString()
  return `/api/videos/search?${query}`
}
```

- [ ] **Step 2: Correct the search form field and preserve category**

Change `SearchForm` to accept `defaultQuery` and `category`. Remove the fixture default value, use `name="q"`, and include:

```tsx
{category !== "all" ? <input type="hidden" name="category" value={category} /> : null}
<InputGroupInput
  name="q"
  defaultValue={defaultQuery}
  placeholder="Describe the video you want to find"
  aria-label="Search short videos"
/>
```

The form remains a native `<form action="/search" method="get">` so submission works without custom submit state.

- [ ] **Step 3: Pass query and category through `SearchControls`**

```ts
type SearchControlsProps = {
  compact?: boolean
  query?: string
  category?: SearchCategoryId
}
```

Forward `query` and `category` to both `SearchForm` and `CategoryFilters`.

- [ ] **Step 4: Turn category buttons into search links**

Change `CategoryFilters` props to accept `query` and `activeCategory`. Render each category as a `Link` with `buttonVariants(...)` and:

```tsx
href={createSearchHref({ query, category: id })}
aria-current={activeCategory === id ? "page" : undefined}
```

Do not add click handlers or local state. Keep the centered row and mobile overflow behavior.

- [ ] **Step 5: Turn popular searches into real links**

Render each item as:

```tsx
<Link
  key={search}
  href={createSearchHref({ query: search, category: "all" })}
  className={buttonVariants({ variant: "secondary", size: "sm" })}
>
  <TrendingUp data-icon="inline-start" className="text-primary" />
  {search}
</Link>
```

- [ ] **Step 6: Manually check navigation**

Expected:

- Submitting `funny cat` opens `/search?q=funny+cat`.
- Selecting Cats preserves `q` and adds `category=cats`.
- Selecting All removes the unnecessary `category` parameter.
- Refresh and browser Back preserve the visible selection.

- [ ] **Step 7: Run static verification**

```powershell
npm run lint
npm run build
```

Expected: both commands exit with code `0`.

- [ ] **Step 8: Commit the slice**

```powershell
git add frontend/src/lib/search-params.ts frontend/src/components/Layout/SearchForm frontend/src/components/Layout/SearchControls frontend/src/components/Layout/CategoryFilters frontend/src/components/Layout/PopularSearches
git commit -m "feat: drive search controls from url"
```

---

### Task 6: Move reusable result states into Layout components

**Deliverable:** Search views only assemble the page; result grid, loading, empty, and error UI live in focused Layout folders.

**Files:**
- Create: `frontend/src/components/Layout/SearchResults/SearchResults.tsx`
- Create: `frontend/src/components/Layout/SearchStates/SearchStates.tsx`
- Delete: `frontend/src/views/search/search-states.tsx`

**Interfaces:**
- Produces: `SearchResults({ items })`, `SearchResultsSkeleton()`, `EmptySearchResults()`, and `SearchErrorState({ message, onRetry })`.
- Consumes: `VideoItem`, existing `Empty`, `Skeleton`, and `VideoCard` UI.

- [ ] **Step 1: Extract the result grid**

```ts
type SearchResultsProps = {
  items: VideoItem[]
}
```

Map `items` into `VideoCard` components without importing fixture data. Task 9 extends this interface with the controlled favorite props.

- [ ] **Step 2: Extract loading and empty states**

Move the existing skeleton and empty markup unchanged into `SearchStates.tsx`. Remove their embedded `SearchControls`; the workspace renders controls once above every state.

- [ ] **Step 3: Add a retryable error state**

```tsx
export function SearchErrorState({
  message,
  onRetry,
}: {
  message: string
  onRetry: () => void
}) {
  return (
    <Empty className="max-w-xl border-0 py-10">
      <EmptyHeader>
        <EmptyTitle className="text-2xl font-bold">Search unavailable</EmptyTitle>
        <EmptyDescription>{message}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button type="button" onClick={onRetry}>Try again</Button>
      </EmptyContent>
    </Empty>
  )
}
```

- [ ] **Step 4: Remove obsolete preview/demo exports**

Once no imports remain, delete `VideoPreviewModal`, `BackToResults`, and fixture-based `SearchResults` from `views/search/search-states.tsx`. Delete the file itself when it becomes empty. This is a source cleanup only; `/preview` is not created because preview is a UI state, not a route.

- [ ] **Step 5: Run static verification**

```powershell
npm run lint
npm run build
```

Expected: both commands exit with code `0`; no import references `views/search/search-states`.

- [ ] **Step 6: Commit the slice**

```powershell
git add -A frontend/src/components/Layout/SearchResults frontend/src/components/Layout/SearchStates frontend/src/views/search
git commit -m "refactor: extract search result states"
```

---

### Task 7: Implement the client SearchWorkspace and pagination

**Deliverable:** `/search` loads real API results and switches between idle, loading, success, empty, and error states.

**Files:**
- Create: `frontend/src/components/Layout/PaginationControls/PaginationControls.tsx`
- Create: `frontend/src/components/Layout/SearchWorkspace/SearchWorkspace.tsx`
- Modify: `frontend/src/views/search/search-view.tsx`

**Interfaces:**
- Consumes: `SearchUrlState`, `createSearchApiUrl`, `SearchVideosResponse`, `SearchApiError`, and extracted result states.
- Produces: `SearchWorkspace({ search })` and URL-based next-page navigation.

- [ ] **Step 1: Add the client workspace state**

Start `SearchWorkspace.tsx` with `"use client"` and use this discriminated state:

```ts
type RequestState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: SearchVideosResponse }
  | { status: "error"; message: string }
```

The initial state is `idle` when `search.query` is empty and `loading` otherwise.

- [ ] **Step 2: Fetch when URL-derived props change**

```ts
useEffect(() => {
  if (!search.query) {
    setRequestState({ status: "idle" })
    return
  }

  const controller = new AbortController()
  setRequestState({ status: "loading" })

  fetch(createSearchApiUrl(search), { signal: controller.signal })
    .then(async (response) => {
      const body = (await response.json()) as SearchVideosResponse | SearchApiError
      if (!response.ok || "error" in body) {
        throw new Error("error" in body ? body.error.message : "Unable to search videos.")
      }
      return body
    })
    .then((data) => setRequestState({ status: "success", data }))
    .catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") return
      setRequestState({
        status: "error",
        message: error instanceof Error ? error.message : "Unable to search videos.",
      })
    })

  return () => controller.abort()
}, [search])
```

Memoize the `search` object in the server view or depend on `search.query`, `search.category`, and `search.pageToken` individually to prevent duplicate requests from object identity changes.

- [ ] **Step 3: Add explicit retry**

Use a numeric `retryKey` state and include it in the effect dependency list:

```ts
const [retryKey, setRetryKey] = useState(0)
const retry = () => setRetryKey((value) => value + 1)
```

Pass `onRetry={retry}` to `SearchErrorState`.

- [ ] **Step 4: Render one state at a time**

Render `SearchControls` first, then:

```tsx
{requestState.status === "loading" ? <SearchResultsSkeleton /> : null}
{requestState.status === "error" ? (
  <SearchErrorState message={requestState.message} onRetry={retry} />
) : null}
{requestState.status === "success" && requestState.data.items.length === 0 ? (
  <EmptySearchResults />
) : null}
{requestState.status === "success" && requestState.data.items.length > 0 ? (
  <SearchResults items={requestState.data.items} />
) : null}
```

- [ ] **Step 5: Add next-page navigation**

`PaginationControls` accepts `search` and `nextPageToken`. Build the Next link with:

```tsx
href={createSearchHref({ ...search, pageToken: nextPageToken })}
```

Do not keep page numbers or tokens in local state. Browser Back is the previous-page action because every token change creates a URL history entry.

- [ ] **Step 6: Make `SearchView` parse the framework search params**

```tsx
import { SearchWorkspace } from "@/components/Layout/SearchWorkspace/SearchWorkspace"
import { SiteHeader } from "@/components/Layout/SiteHeader/SiteHeader"
import { readSearchUrlState } from "@/lib/search-params"

export async function SearchView({ searchParams }: PageProps<"/search">) {
  const raw = await searchParams
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === "string") params.set(key, value)
    else if (Array.isArray(value) && value[0]) params.set(key, value[0])
  }

  const search = readSearchUrlState(params)

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="pt-5">
        <SearchWorkspace search={search} />
      </main>
    </div>
  )
}
```

Keep `src/app/search/page.tsx` as `export default SearchView`.

- [ ] **Step 7: Manually check the request states**

Expected:

- `/search` does not request the API and shows the controls.
- `/search?q=cats` shows the skeleton and then results or the missing-key error.
- Retry repeats the current URL-derived request.
- Next updates only `pageToken` and browser Back restores the prior page.

- [ ] **Step 8: Run static verification**

```powershell
npm run lint
npm run build
```

Expected: both commands exit with code `0`.

- [ ] **Step 9: Commit the slice**

```powershell
git add frontend/src/components/Layout/PaginationControls frontend/src/components/Layout/SearchWorkspace frontend/src/views/search/search-view.tsx
git commit -m "feat: load youtube search results"
```

---

### Task 8: Add the local favorites service

**Deliverable:** Favorite videos can be read, added, and removed safely from `localStorage` with duplicate prevention.

**Files:**
- Create: `frontend/src/constants/storage.ts`
- Create: `frontend/src/services/Favorites/favorites-storage.ts`

**Interfaces:**
- Produces: `readFavorites()`, `addFavorite(video)`, `removeFavorite(id)`, and `toggleFavorite(video)`.
- Consumes: `VideoItem`.

- [ ] **Step 1: Add one stable storage key**

```ts
export const FAVORITES_STORAGE_KEY = "shortfinder:favorites:v1"
```

- [ ] **Step 2: Validate stored objects before returning them**

```ts
function isVideoItem(value: unknown): value is VideoItem {
  if (!value || typeof value !== "object") return false
  const item = value as Partial<VideoItem>

  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.creator === "string" &&
    typeof item.channelId === "string" &&
    (typeof item.views === "number" || item.views === null) &&
    typeof item.durationSeconds === "number" &&
    typeof item.thumbnailUrl === "string" &&
    typeof item.publishedAt === "string" &&
    typeof item.youtubeUrl === "string"
  )
}
```

- [ ] **Step 3: Implement safe reads and writes**

```ts
export function readFavorites(): VideoItem[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) ?? "[]")
    if (!Array.isArray(parsed)) throw new Error("Invalid favorites payload")
    return parsed.filter(isVideoItem)
  } catch {
    localStorage.removeItem(FAVORITES_STORAGE_KEY)
    return []
  }
}

function writeFavorites(items: VideoItem[]) {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items))
  return items
}
```

- [ ] **Step 4: Implement idempotent mutations**

```ts
export function addFavorite(video: VideoItem) {
  const items = readFavorites()
  return items.some((item) => item.id === video.id)
    ? items
    : writeFavorites([video, ...items])
}

export function removeFavorite(id: string) {
  return writeFavorites(readFavorites().filter((item) => item.id !== id))
}

export function toggleFavorite(video: VideoItem) {
  const items = readFavorites()
  return items.some((item) => item.id === video.id)
    ? writeFavorites(items.filter((item) => item.id !== video.id))
    : writeFavorites([video, ...items])
}
```

- [ ] **Step 5: Run static verification**

```powershell
npm run lint
npm run build
```

Expected: both commands exit with code `0`; the service is not imported by a Server Component.

- [ ] **Step 6: Commit the slice**

```powershell
git add frontend/src/constants/storage.ts frontend/src/services/Favorites
git commit -m "feat: add local favorites storage"
```

---

### Task 9: Connect favorite actions to search cards

**Deliverable:** Search result cards show their saved status and add or remove favorites immediately.

**Files:**
- Modify: `frontend/src/components/Layout/VideoCard/VideoCard.tsx`
- Modify: `frontend/src/components/Layout/SearchResults/SearchResults.tsx`
- Modify: `frontend/src/components/Layout/SearchWorkspace/SearchWorkspace.tsx`

**Interfaces:**
- Consumes: `readFavorites()` and `toggleFavorite(video)`.
- Produces: `VideoCard` callback prop, the extended `SearchResults` props, and live `favoriteIds` in the search workspace.

- [ ] **Step 1: Make `VideoCard` interaction controlled**

Add this prop and wire it only to the heart button:

```ts
onFavoriteToggle?: (video: VideoItem) => void
```

```tsx
<Button
  type="button"
  aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
  onClick={() => onFavoriteToggle?.(video)}
>
  <Heart className={favorite ? "fill-primary text-primary" : undefined} />
</Button>
```

The card remains presentation-focused and never accesses `localStorage` directly.

- [ ] **Step 2: Extend `SearchResults` with controlled favorites**

```ts
type SearchResultsProps = {
  items: VideoItem[]
  favoriteIds: ReadonlySet<string>
  onFavoriteToggle: (video: VideoItem) => void
}
```

Pass `favorite={favoriteIds.has(video.id)}` and `onFavoriteToggle` to each `VideoCard`.

- [ ] **Step 3: Initialize saved IDs after the client mounts**

In `SearchWorkspace`:

```ts
const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())

useEffect(() => {
  setFavoriteIds(new Set(readFavorites().map((video) => video.id)))
}, [])
```

- [ ] **Step 4: Toggle through the storage service**

```ts
function handleFavoriteToggle(video: VideoItem) {
  const nextFavorites = toggleFavorite(video)
  setFavoriteIds(new Set(nextFavorites.map((item) => item.id)))
}
```

Pass this handler through `SearchResults` to each `VideoCard`.

- [ ] **Step 5: Manually verify the card interaction**

Expected:

- First click fills the heart and creates `shortfinder:favorites:v1` in DevTools Application storage.
- Second click removes the item and clears the filled state.
- Repeated adds never create duplicate IDs.
- Refresh restores the filled state.

- [ ] **Step 6: Run static verification**

```powershell
npm run lint
npm run build
```

Expected: both commands exit with code `0`.

- [ ] **Step 7: Commit the slice**

```powershell
git add frontend/src/components/Layout/VideoCard frontend/src/components/Layout/SearchResults frontend/src/components/Layout/SearchWorkspace
git commit -m "feat: save favorites from search results"
```

---

### Task 10: Implement the FavoritesWorkspace

**Deliverable:** `/favorites` renders saved videos, supports removal, and switches to the empty state when the final item is removed.

**Files:**
- Create: `frontend/src/components/Layout/FavoritesWorkspace/FavoritesWorkspace.tsx`
- Modify: `frontend/src/views/favorites/favorites-states.tsx`
- Modify: `frontend/src/views/favorites/favorites-view.tsx`

**Interfaces:**
- Consumes: `readFavorites()`, `removeFavorite(id)`, `VideoCard`, `CategoryFilters`, and the current empty-state markup.
- Produces: `FavoritesWorkspace()`.

- [ ] **Step 1: Create the client workspace**

```tsx
"use client"

export function FavoritesWorkspace() {
  const [items, setItems] = useState<VideoItem[] | null>(null)

  useEffect(() => {
    setItems(readFavorites())
  }, [])

  if (items === null) return <FavoritesSkeleton />
  if (items.length === 0) return <EmptyFavorites />

  function handleRemove(video: VideoItem) {
    setItems(removeFavorite(video.id))
  }

  return <FavoritesGrid items={items} onRemove={handleRemove} />
}
```

- [ ] **Step 2: Make the grid accept real items**

Change the fixture-driven grid to:

```ts
type FavoritesGridProps = {
  items: VideoItem[]
  onRemove: (video: VideoItem) => void
}
```

Derive the badge from `items.length`, map `items`, and pass `favorite` plus `onFavoriteToggle={onRemove}` to each card. Do not import `videos`.

- [ ] **Step 3: Add a hydration-safe skeleton**

Render the existing card skeleton pattern while `items === null`. This avoids briefly showing the empty state before `localStorage` is read.

- [ ] **Step 4: Keep category controls presentation-only on Favorites**

Pass `query=""` and `activeCategory="all"`, or disable category links on this page until filtering saved items is explicitly added to scope. Do not add a second search/filter state in this MVP.

- [ ] **Step 5: Make the view assemble only the workspace**

```tsx
export function FavoritesView() {
  return (
    <div className="min-h-screen">
      <SiteHeader active="favorites" />
      <FavoritesWorkspace />
    </div>
  )
}
```

- [ ] **Step 6: Remove the obsolete fixture import and empty file**

Move `FavoritesGrid`, `FavoritesSkeleton`, and `EmptyFavorites` into `FavoritesWorkspace.tsx` as file-local components, then delete `views/favorites/favorites-states.tsx`. Keep `views/favorites/favorites-view.tsx` as the route-level composition.

- [ ] **Step 7: Manually verify favorites**

Expected:

- A saved search result appears after navigating to `/favorites`.
- Refresh keeps the item.
- Removing one item updates the count immediately.
- Removing the last item shows `EmptyFavorites` without a page reload.
- Malformed JSON in the storage key is removed and produces the empty state.

- [ ] **Step 8: Run static verification**

```powershell
npm run lint
npm run build
```

Expected: both commands exit with code `0`.

- [ ] **Step 9: Commit the slice**

```powershell
git add -A frontend/src/components/Layout/FavoritesWorkspace frontend/src/views/favorites
git commit -m "feat: render local favorites"
```

---

### Task 11: Replace fixtures and clean the static prototype leftovers

**Deliverable:** Production screens use only live API/local data, dead demo modules are removed, and visible mojibake/default fixture text is gone.

**Files:**
- Delete: `frontend/src/constants/videos.ts`
- Modify: `frontend/src/components/Layout/SearchForm/SearchForm.tsx`
- Modify: `frontend/src/components/Layout/PlatformSelector/PlatformSelector.tsx`
- Modify: `frontend/src/views/home/home-view.tsx`
- Modify: any remaining imports returned by the search command below.

**Interfaces:**
- Consumes: Completed search and favorites workspaces.
- Produces: A fixture-free runtime UI.

- [ ] **Step 1: Locate all remaining fixture and broken-text references**

Use PowerShell because `rg` is unavailable in this environment:

```powershell
Get-ChildItem frontend/src -Recurse -File |
  Select-String -Pattern '@/constants/videos|Р.|в™|вњ|рџ' |
  Select-Object Path, LineNumber, Line
```

Expected: every match is reviewed; no result is ignored.

- [ ] **Step 2: Remove runtime fixture dependencies**

Delete `constants/videos.ts` only after the search and favorites views no longer import it. Remove unused imports and unused preview/demo exports revealed by lint.

- [ ] **Step 3: Correct remaining visible copy**

Use plain UTF-8 copy:

```text
Search placeholder: Describe the video you want to find
Platform note: Videos up to 3 minutes are available right now.
TikTok symbol: replace the broken text glyph with a lucide icon or plain "TikTok" label.
YouTube label: YouTube
```

- [ ] **Step 4: Make real external video navigation explicit**

Wrap the thumbnail/title area in an external anchor using `video.youtubeUrl`:

```tsx
<a href={video.youtubeUrl} target="_blank" rel="noreferrer">
  {/* existing thumbnail and title content */}
</a>
```

Keep the favorite button outside the anchor so clicking the heart never opens YouTube.

- [ ] **Step 5: Re-run the stale-reference scan**

```powershell
Get-ChildItem frontend/src -Recurse -File |
  Select-String -Pattern '@/constants/videos|Р.|в™|вњ|рџ'
```

Expected: no matches.

- [ ] **Step 6: Run static verification**

```powershell
npm run lint
npm run build
```

Expected: both commands exit with code `0`; only `/`, `/search`, `/favorites`, and `/api/videos/search` are application routes.

- [ ] **Step 7: Commit the slice**

```powershell
git add -A frontend/src
git commit -m "refactor: remove static video fixtures"
```

---

### Task 12: Document setup and perform final MVP acceptance

**Deliverable:** Another developer can configure the API key and verify the complete user journey without hidden knowledge.

**Files:**
- Modify: `frontend/README.md`

**Interfaces:**
- Consumes: All previous tasks.
- Produces: Setup instructions and a completed acceptance checklist.

- [ ] **Step 1: Replace the generated README with project-specific setup**

Document these exact commands and variables:

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Explain that the developer must enable YouTube Data API v3 in Google Cloud and set `YOUTUBE_API_KEY` in `.env.local`. State that `.env.local` must never be committed.

- [ ] **Step 2: Add the supported route and storage reference**

Document:

```text
/              Search landing page
/search        URL-driven results page
/favorites     Browser-local saved videos
/api/videos/search  Server proxy for YouTube search
localStorage key: shortfinder:favorites:v1
maximum duration: 180 seconds
```

- [ ] **Step 3: Run a real API acceptance search**

With a valid `.env.local`, open `/`, search for `funny cat`, and confirm:

- the URL becomes `/search?q=funny+cat`;
- a loading skeleton appears before results;
- every displayed duration is `3:00` or shorter;
- opening a card navigates to its real YouTube URL;
- Next adds a `pageToken` parameter and browser Back restores the prior results.

- [ ] **Step 4: Run favorites acceptance**

Confirm:

- saving a card changes its heart state;
- reloading `/search` preserves that state;
- `/favorites` contains the saved video;
- removing the last video shows the empty state;
- invalid JSON placed in `shortfinder:favorites:v1` is cleared safely.

- [ ] **Step 5: Run error acceptance**

Confirm:

- an empty form does not issue a YouTube request;
- a missing API key shows the configuration message;
- an unreachable API shows a retry action;
- a valid response with no videos at or below 180 seconds shows the empty state;
- no response or browser console message exposes the API key.

- [ ] **Step 6: Check responsive layout**

At approximately `375px`, `768px`, and `1440px` widths, confirm that the header, form, centered category row, result grid, favorite buttons, empty states, and pagination do not clip or overflow. The category row may scroll horizontally on narrow screens.

- [ ] **Step 7: Run final static verification**

```powershell
npm run lint
npm run build
```

Expected: both commands exit with code `0`; the build completes without TypeScript, image-host, or server/client boundary errors.

- [ ] **Step 8: Commit the documentation**

```powershell
git add frontend/README.md
git commit -m "docs: add youtube mvp setup"
```

## Recommended Execution Order

Execute Tasks 1 through 12 in order. Tasks 1–4 establish the server contract, Tasks 5–7 activate search, Tasks 8–10 activate favorites, and Tasks 11–12 remove prototype debt and verify the complete MVP. Stop after any task whose lint/build check fails; fix that slice before starting the next one.
