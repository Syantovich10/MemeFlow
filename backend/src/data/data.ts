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
    { id: "youtube", label: "YouTube", description: "Shorts", available: true, classNames: "h-11 min-w-40 justify-start border" },
    { id: "tiktok", label: "TikTok", description: null, available: false, classNames: "h-11 min-w-36 justify-start text-muted-foreground" },
    { id: "instagram", label: "Instagram", description: null, available: false, classNames: "h-11 min-w-40 justify-start text-muted-foreground" },
] as const

export const popularSearches = [
    "mellstroy",
    "funny cat",
    "streamer rage",
    "sigma",
    "funny reaction",
] as const
