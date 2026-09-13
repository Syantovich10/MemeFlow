export function YouTubeVideo({ videoId }: { videoId: string }) {
    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 9",
            }}
        >
            <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                }}
            />
        </div>
    );
}