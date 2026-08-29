import type { VideoSearchItem } from "@/types/api";
import type { YouTubeSearchResponse } from "@/types/apiResponse";

export const transformResponse = (response: YouTubeSearchResponse): VideoSearchItem[] => {
    return response.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high?.url,
        channel: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
    }));
}