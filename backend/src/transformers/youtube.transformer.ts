import {type YouTubeVideoItem} from "../types/video";
import {type }

export function transformYoutubeVideos(
    items: YouTubeVideoItem[]
): Video[] {
    return items.map(video => ({
        id: video.id,

        title: video.snippet.title,

        creator: video.snippet.channelTitle,

        image:
            video.snippet.thumbnails.maxres?.url ??
            video.snippet.thumbnails.high?.url ??
            video.snippet.thumbnails.medium.url,

        duration: video.contentDetails.duration,

        views: Number(video.statistics.viewCount ?? 0),
    }));
}