'use client'

import Image from "next/image"
import { Heart, Video } from "lucide-react"
import type { VideoSearchResult } from "@/types/api"
import { YouTubeVideo } from "@/components/Layout/YoutubeVideo/YoutubeVideo";
import { Badge } from "@/components/UI/Badge/Badge"
import { Button } from "@/components/UI/Button/Button"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/Card/Card"
import { cn, transformVideoDuration } from "@/lib/utils"


export function VideoCard({
  video,
  favorite = false,
  variant = "search",
}: {
  video: VideoSearchResult
  favorite?: boolean
  variant?: "search" | "favorite"
}){

  const compact = variant === "favorite";

  console.log(video.id)

  return (
    <Card
      size="sm"
      className={cn(
        "group overflow-hidden rounded-xl border bg-card/80 py-0 shadow-none ring-0 transition-colors hover:border-primary/55",
        compact && "gap-0"
      )}
    >

      <Link href={`/video?videoId=${encodeURIComponent(video.id)}`}>
        <div className={cn("relative overflow-hidden", compact ? "aspect-[4/3]" : "aspect-[3/4]") }>
          <Image
              src={video.image}
              alt=""
              fill
              sizes={compact ? "(max-width: 768px) 50vw, 16vw" : "(max-width: 768px) 50vw, 20vw"}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-background/10" />
          <Badge variant="secondary" className="absolute left-2 top-2 bg-background/70 text-[10px]">
            {transformVideoDuration(video.duration)}
          </Badge>
          <Button
              type="button"
              size="icon-xs"
              variant="secondary"
              aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
              className="absolute right-2 top-2 bg-background/70"
          >
            <Heart className={favorite ? "fill-primary text-primary" : undefined} aria-hidden="true" />
          </Button>
          {!compact ? (
              <CardHeader className="absolute inset-x-0 bottom-0 gap-1 px-3 pb-3">
                <CardTitle className="line-clamp-2 text-sm leading-snug">{video.title}</CardTitle>
                <CardDescription className="text-xs">{video.creator}</CardDescription>
                <CardDescription className="text-[11px]">{video.views}</CardDescription>
              </CardHeader>
          ) : null}
        </div>
        {compact ? (
            <>
              <CardContent className="flex flex-col gap-1.5 px-3 pt-2.5">
                <CardTitle className="line-clamp-2 min-h-9 text-sm leading-snug">{video.title}</CardTitle>
                <CardDescription className="text-xs">{video.creator} <span className="text-primary">●</span></CardDescription>
                <CardDescription className="text-xs">{video.views}</CardDescription>
              </CardContent>
              <CardFooter className="gap-2 px-3 pb-3 pt-2 text-xs text-muted-foreground">
                <Video className="text-red-500" aria-hidden="true" />
                YouTube
              </CardFooter>
            </>
        ) : (
            <CardFooter className="gap-2 px-3 pb-3 text-[11px] text-muted-foreground">
              <Video className="text-red-500" aria-hidden="true" />
              YouTube Shorts
            </CardFooter>
        )}
      </Link>

    </Card>
  )
}
