"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoService = void 0;
const youtube_client_1 = require("../clients/youtube.client");
const youtube_transformer_1 = require("../transformers/youtube.transformer");
exports.videoService = {
    search: async (query, maxResults) => {
        const ids = await youtube_client_1.youtubeClient.getIds({ query, maxResults: maxResults.toString() });
        if (ids.length === 0) {
            return [];
        }
        const videos = await youtube_client_1.youtubeClient.getVideos(ids);
        return (0, youtube_transformer_1.transformYoutubeVideos)(videos);
    }
};
