import { VideoSearchItem } from "@/types/api";
import { YouTubeSearchResponse } from "@/types/apiResponse";
import { transformResponse } from "@/lib/transformResponse";

type SearchVideosParams = {
    query: string;
    maxResults?: number;
};

const API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL  = process.env.YOUTUBE_BASE_URL;

console.log(API_KEY, BASE_URL);
// const API_KEY: string | undefined = "AIzaSyCqwqRlzqNPAotET_asqCdoXJi1fuCpdWg";
// const BASE_URL: string | undefined  = "https://www.googleapis.com/youtube/v3";
// console.log(BASE_URL, API_KEY);

export const fetchIdsByQuery = async (
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

        order: "relevance",
        videoDuration: "short",

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