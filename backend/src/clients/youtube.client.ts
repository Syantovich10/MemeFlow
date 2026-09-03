
const API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = process.env.YOUTUBE_BASE_URL;

if(!API_KEY || !BASE_URL) {
    throw new Error("No API key or base URL provided");
}

export const youtubeClient = {
    getIds: async (params: {query: string, maxResults: string}) => {
        const requestParams = new URLSearchParams({
            part: 'snippet',
            type: 'video',
            q: params.query,
            maxResults: String(params.maxResults),
            key: API_KEY,
        });

        const response = await fetch(`${BASE_URL}/search?${requestParams.toString()}`);

        if (!response.ok) {
            throw new Error(`Error fetching YouTube IDs: ${response.statusText}`);
        }

        const data = await response.json();
        return data.items.map((item: any) => item.id.videoId);
    },
    getVideos: async (ids: string[]) => {
        const params = new URLSearchParams({
            part: 'snippet,contentDetails,statistics',
            id: ids.join(','),
            key: API_KEY,
        });

        const response = await fetch(`${BASE_URL}/videos?${params}`);
        if (!response.ok) {
            throw new Error(`Error fetching YouTube videos: ${response.statusText}`);
        }
        const data = await response.json();
        return data.items;
    }
}