export type VideoSearchResult = {
    id: string;
    url: string;
    title: string;
    creator: string;
    image: string;
    duration: string;
    views: number;
};

export type VideoSearchItem = {
    id: string | undefined;
    title: string | undefined;
    thumbnail: string | undefined;
    channel: string | undefined;
    publishedAt: string | undefined;
};
