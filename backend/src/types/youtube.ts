export type YouTubeThumbnail = {
    url: string;
    width?: number;
    height?: number;
};

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

export type YouTubeSearchItem = {
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

export type YouTubeVideosResponse = {
    kind: "youtube#videoListResponse";
    etag: string;

    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };

    items: YouTubeVideoItem[];
};

export type YouTubeVideoItem = {
    kind: "youtube#video";
    etag: string;
    id: string;

    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;

        thumbnails: {
            default?: YouTubeThumbnail;
            medium?: YouTubeThumbnail;
            high?: YouTubeThumbnail;
            standard?: YouTubeThumbnail;
            maxres?: YouTubeThumbnail;
        };

        channelTitle: string;
        categoryId: string;

        tags?: string[];

        liveBroadcastContent: "none" | "upcoming" | "live";

        localized?: {
            title: string;
            description: string;
        };
    };

    contentDetails: {
        duration: string;
        dimension: "2d" | "3d";
        definition: "hd" | "sd";
        caption: "true" | "false";
        licensedContent: boolean;
        projection: "rectangular" | "360";
    };

    statistics: {
        viewCount?: string;
        likeCount?: string;
        favoriteCount: string;
        commentCount?: string;
    };
};
