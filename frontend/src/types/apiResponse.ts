export type YouTubeSearchResponse = {
    kind: "youtube#searchListResponse";
    etag: string;
    nextPageToken?: string;
    prevPageToken?: string;
    regionCode?: string;

    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };

    items: YouTubeSearchItem[];
};

type YouTubeSearchItem = {
    kind: "youtube#searchResult";
    etag: string;

    id: {
        kind: "youtube#video";
        videoId: string;
    };

    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;

        thumbnails: {
            default?: YouTubeThumbnail;
            medium?: YouTubeThumbnail;
            high?: YouTubeThumbnail;
        };

        channelTitle: string;
        liveBroadcastContent: "none" | "upcoming" | "live";
        publishTime: string;
    };
};

type YouTubeThumbnail = {
    url: string;
    width?: number;
    height?: number;
};