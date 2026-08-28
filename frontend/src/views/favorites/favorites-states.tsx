import Link from "next/link"
import { ChevronDown, Compass, Heart } from "lucide-react"

import { CategoryFilters } from "@/components/Layout/CategoryFilters/CategoryFilters"
import { VideoCard } from "@/components/Layout/VideoCard/VideoCard"
import { Badge } from "@/components/UI/Badge/Badge"
import { buttonVariants, Button } from "@/components/UI/Button/Button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/UI/Empty/Empty"
import { videos } from "@/constants/videos"
import { cn } from "@/lib/utils"

export function FavoritesGrid() {
  return (
    <main className="mx-auto w-full max-w-[1120px] px-4 pb-12 pt-7 sm:px-6">
      <div className="mb-5 flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Favorites</h1>
          <Badge variant="secondary" className="text-primary">24 saved</Badge>
        </div>
        <p className="text-sm text-muted-foreground">Your saved videos, all in one place.</p>
      </div>
      <div className="mb-5 flex min-w-0 items-start justify-between gap-4">
        <div className="min-w-0 flex-1"><CategoryFilters compact /></div>
        <Button variant="outline" size="sm" className="hidden shrink-0 sm:flex">
          Recently added <ChevronDown data-icon="inline-end" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {videos.map((video) => <VideoCard key={video.id} video={video} variant="favorite" favorite />)}
      </div>
    </main>
  )
}

export function EmptyFavorites() {
  return (
    <main className="mx-auto flex w-full max-w-[760px] flex-col items-center px-4 pb-12 pt-12 sm:px-6">
      <h1 className="mb-10 text-5xl font-bold tracking-tight">Favorites<span className="text-primary">.</span></h1>
      <Empty className="violet-outline min-h-[390px] rounded-2xl border bg-card/55">
        <EmptyHeader>
          <EmptyMedia className="mb-4 size-28 rounded-full border border-primary/50 bg-card text-primary">
            <Heart className="size-14" aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle className="text-3xl font-bold">No saved videos yet</EmptyTitle>
          <EmptyDescription className="text-base">Save clips you want to find again later.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link href="/" className={cn(buttonVariants({ size: "lg" }), "px-7")}>
            <Compass data-icon="inline-start" /> Explore videos
          </Link>
        </EmptyContent>
      </Empty>
    </main>
  )
}
