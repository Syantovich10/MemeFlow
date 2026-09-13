import { type YouTubeVideoItem } from "../types/youtube";
import { type Video } from "../types/video";

export function transformYoutubeVideos(
    items: YouTubeVideoItem[]
): Video[] {
    return items.map((video) => ({
        id: video.id,
        url: `https://www.youtube.com/watch?v=${encodeURIComponent(video.id)}`,

        title: video.snippet.title,

        creator: video.snippet.channelTitle,

        image:
            video.snippet.thumbnails.maxres?.url ??
            video.snippet.thumbnails.high?.url ??
            video.snippet.thumbnails.medium?.url ??
            video.snippet.thumbnails.default?.url ??
            "",

        duration: video.contentDetails.duration,

        views: Number(video.statistics.viewCount ?? 0),
    }));
}
