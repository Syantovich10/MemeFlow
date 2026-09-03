"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformYoutubeVideos = transformYoutubeVideos;
function transformYoutubeVideos(items) {
    return items.map((video) => ({
        id: video.id,
        title: video.snippet.title,
        creator: video.snippet.channelTitle,
        image: video.snippet.thumbnails.maxres?.url ??
            video.snippet.thumbnails.high?.url ??
            video.snippet.thumbnails.medium?.url ??
            video.snippet.thumbnails.default?.url ??
            "",
        duration: video.contentDetails.duration,
        views: Number(video.statistics.viewCount ?? 0),
    }));
}
