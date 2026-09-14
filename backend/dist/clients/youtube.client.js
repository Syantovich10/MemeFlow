"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.youtubeClient = void 0;
const API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = process.env.YOUTUBE_BASE_URL;
if (!API_KEY || !BASE_URL) {
    throw new Error("No API key or base URL provided");
}
exports.youtubeClient = {
    getIds: async (params) => {
        const requestParams = new URLSearchParams({
            part: "snippet",
            type: "video",
            videoDuration: "short",
            q: params.query,
            maxResults: params.maxResults,
            key: API_KEY,
        });
        const response = await fetch(`${BASE_URL}/search?${requestParams.toString()}`);
        if (!response.ok) {
            const body = await response.text();
            throw new Error(`YouTube search failed: ${response.status} ${response.statusText}\n${body}`);
        }
        const data = await response.json();
        return data.items.map((item) => item.id.videoId);
    },
    getVideos: async (ids) => {
        const params = new URLSearchParams({
            part: "snippet,contentDetails,statistics",
            id: ids.join(","),
            key: API_KEY,
        });
        const response = await fetch(`${BASE_URL}/videos?${params.toString()}`);
        if (!response.ok) {
            const body = await response.text();
            throw new Error(`YouTube videos failed: ${response.status} ${response.statusText}\n${body}`);
        }
        const data = await response.json();
        return data.items;
    },
};
