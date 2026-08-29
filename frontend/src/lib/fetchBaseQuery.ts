import { VideoSearchItem } from "@/types/api";
import { YouTubeSearchResponse } from "@/types/apiResponse";
import { transformResponse } from "@/lib/transformResponse";

type SearchVideosParams = {
    query: string;
    maxResults?: number;
};

const API_KEY: string | undefined = process.env.NEXT_API_KEY;
const BASE_URL: string | undefined  = process.env.NEXT_BASE_URL;

export const fetchVideos = async (
    {
        query,
        maxResults = 10,
    }: SearchVideosParams): Promise<VideoSearchItem[]> => {

    if (!API_KEY || !BASE_URL) {
        throw new Error("YouTube API env variables are missing");
    }

    const params = new URLSearchParams({
        part: "snippet",
        type: "video",
        q: query,
        maxResults: String(maxResults),
        key: API_KEY,
    });

    const response = await fetch(
        `${BASE_URL}/search?${params.toString()}`,
    );

    if (!response.ok) {
        throw new Error(
            `YouTube API error: ${response.status} ${response.statusText}`,
        );
    }

    const json: YouTubeSearchResponse = await response.json();

    return transformResponse(json);
};