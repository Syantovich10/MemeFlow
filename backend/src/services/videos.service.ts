import { youtubeClient } from "../clients/youtube.client"

export const videoService = {
    search: async (query: string, maxResults: number) => {

        const ids: string[] = await youtubeClient.getIds({query, maxResults: maxResults.toString()});

        const videos = await youtubeClient.getVideos(ids);

        return videos;

    }
}