'use client'

import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function YouTubeVideo({ embedded = false }: { embedded?: boolean }) {
    const searchParams = useSearchParams()
    const videoId = searchParams.get("videoId")

    return (
        <div className={cn("flex w-full items-center justify-center", !embedded && "min-h-svh px-4 py-6")}>
            <div className={cn(
                "relative isolate aspect-[9/16] w-full overflow-hidden rounded-2xl border border-primary/20 bg-black ring-1 ring-white/5 focus-within:border-primary/60",
                embedded
                    ? "max-w-[min(420px,calc(56.25svh_-_4.5rem))]"
                    : "max-w-[min(420px,calc(56.25svh_-_1.6875rem))] shadow-[0_16px_64px_-16px_var(--primary)]",
            )}>
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 block h-full w-full border-0"
                />
            </div>
        </div>
    );
}
