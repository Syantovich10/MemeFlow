export const searchCategories = [
  { id: "all", label: "All" },
  { id: "trending", label: "Trending" },
  { id: "mellstroy", label: "Mellstroy" },
  { id: "cats", label: "Cats" },
  { id: "memes", label: "Memes" },
  { id: "gaming", label: "Gaming" },
  { id: "streamers", label: "Streamers" },
] as const

export const videoPlatforms = [
  { id: "youtube", label: "YouTube", description: "Shorts", available: true },
  { id: "tiktok", label: "TikTok", description: null, available: false },
  { id: "instagram", label: "Instagram", description: null, available: false },
] as const

export const popularSearches = [
  "mellstroy",
  "funny cat",
  "streamer rage",
  "sigma",
  "funny reaction",
] as const

export type SearchCategoryId = (typeof searchCategories)[number]["id"]
export type VideoPlatformId = (typeof videoPlatforms)[number]["id"]
