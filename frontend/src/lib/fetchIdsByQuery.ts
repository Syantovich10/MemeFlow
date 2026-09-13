import type { VideoSearchResult } from "@/types/api";

type SearchVideosParams = {
    query: string;
    maxResults?: number;
};

const BASE_URL = process.env.NEXT_PUBLIC_YOUTUBE_BASE_URL;


export const fetchIdsByQuery = async (
    {
        query,
        maxResults = 10,
    }: SearchVideosParams): Promise<VideoSearchResult[]> => {

    if (!BASE_URL) {
        throw new Error("NEXT_PUBLIC_YOUTUBE_BASE_URL is missing");
    }

    const params = new URLSearchParams({
        query,
        maxResults: String(maxResults),
    });

    const response = await fetch(
        `${BASE_URL.replace(/\/$/, "")}/search?${params.toString()}`,
    );

    if (!response.ok) {
        throw new Error(
            `Video search API error: ${response.status} ${response.statusText}`,
        );
    }

    const json: { videos: VideoSearchResult[] } = await response.json();


    return json.videos;
};


