import { youtubeClient } from "../clients/youtube.client"
import { transformYoutubeVideos } from "../transformers/youtube.transformer";

export const videoService = {
    search: async (query: string, maxResults: number) => {
        const ids: string[] = await youtubeClient.getIds({query, maxResults: maxResults.toString()});

        if(ids.length === 0) {
            return [];
        }

        const videos = await youtubeClient.getVideos(ids);

        return transformYoutubeVideos(videos);
    }
}