import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Compass,
  ExternalLink,
  Play,
  SearchX,
  Star,
  X,
  Video,
} from "lucide-react"

import { SearchControls } from "@/components/Layout/SearchControls/SearchControls"
import { VideoCard } from "@/components/Layout/VideoCard/VideoCard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar/Avatar"
import { Badge } from "@/components/UI/Badge/Badge"
import { Button, buttonVariants } from "@/components/UI/Button/Button"
import { Card } from "@/components/UI/Card/Card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/UI/Empty/Empty"
import { Skeleton } from "@/components/UI/Skeleton/Skeleton"
import { videos } from "@/constants/videos"
import { cn } from "@/lib/utils"

export function SearchResults() {
  return (
    <section className="mx-auto flex w-full max-w-[1120px] flex-col items-center gap-4 px-4 pb-12 sm:px-6">
      <SearchControls compact />
      <p className="text-sm text-muted-foreground">38 videos found</p>
      <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {videos.map((video) => <VideoCard key={video.id} video={video} />)}
      </div>
    </section>
  )
}

export function SearchResultsSkeleton() {
  return (
    <section className="mx-auto flex w-full max-w-[1120px] flex-col items-center gap-6 px-4 pb-12 sm:px-6">
      <SearchControls compact />
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Skeleton className="aspect-[3/4] w-full rounded-xl" />
            <Skeleton className="h-3 w-[88%]" />
            <Skeleton className="h-3 w-[66%]" />
            <div className="flex items-center gap-2 pt-1">
              <Skeleton className="size-5 rounded-full" />
              <Skeleton className="h-2.5 w-14" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function EmptySearchResults() {
  return (
    <section className="mx-auto flex w-full max-w-[1120px] flex-col items-center gap-10 px-4 pb-12 sm:px-6">
      <SearchControls compact />
      <Empty className="max-w-xl border-0 py-4">
        <EmptyHeader>
          <EmptyMedia className="relative size-28 rounded-3xl border border-primary/40 bg-card text-primary">
            <Play className="size-11 fill-primary/40" aria-hidden="true" />
            <span className="absolute -right-4 bottom-0 flex size-12 items-center justify-center rounded-full border-2 border-primary bg-background">
              <SearchX className="size-7" aria-hidden="true" />
            </span>
          </EmptyMedia>
          <EmptyTitle className="text-3xl font-bold">No results found</EmptyTitle>
          <EmptyDescription className="text-base">Try another phrase, broader wording, or a different category.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link href="/" className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "text-primary")}>
            <Compass data-icon="inline-start" />
            Explore trending
          </Link>
        </EmptyContent>
      </Empty>
    </section>
  )
}

export function VideoPreviewModal() {
  const video = videos[1]

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
      <Card className="violet-outline relative grid w-full max-w-[920px] gap-6 overflow-visible rounded-2xl border bg-card p-4 md:grid-cols-[1fr_0.9fr] md:p-6">
        <Button type="button" size="icon-sm" variant="ghost" aria-label="Close preview" className="absolute right-3 top-3">
          <X aria-hidden="true" />
        </Button>
        <div className="relative mx-auto aspect-[9/14] w-full max-w-[390px] overflow-hidden rounded-xl">
          <Image src={video.image} alt="" fill className="object-cover" sizes="390px" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          <Button type="button" size="icon-lg" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-label="Play video">
            <Play className="fill-current" aria-hidden="true" />
          </Button>
          <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 text-xs">
            <Play className="fill-current" aria-hidden="true" />
            <span>0:04 / 0:15</span>
            <div className="h-1 flex-1 rounded-full bg-foreground/30"><div className="h-full w-1/3 rounded-full bg-primary" /></div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-5 pr-2">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarImage src={video.image} alt="MeowMoments" />
              <AvatarFallback>MM</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">MeowMoments</p>
              <p className="text-xs text-muted-foreground">@meowmoments</p>
            </div>
          </div>
          <div>
            <h2 className="max-w-xs text-3xl font-bold">Жирный друг счастлив<span className="text-primary">.</span></h2>
            <p className="mt-3 text-sm text-muted-foreground">125.4K views · 2 weeks ago</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><Video className="text-red-500" /> YouTube</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button><Star data-icon="inline-start" /> Add to Favorites</Button>
            <Button variant="outline"><ExternalLink data-icon="inline-start" /> Open on YouTube</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {["жирный кот", "котики", "милота", "счастье", "funny cat"].map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
          </div>
        </div>
        <Button type="button" variant="ghost" size="icon" aria-label="Previous video" className="absolute -left-16 top-1/2 hidden md:flex"><ChevronLeft /></Button>
        <Button type="button" variant="ghost" size="icon" aria-label="Next video" className="absolute -right-16 top-1/2 hidden md:flex"><ChevronRight /></Button>
      </Card>
    </div>
  )
}

export function BackToResults() {
  return (
    <Link href="/search" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
      <ArrowLeft aria-hidden="true" /> Back to results
    </Link>
  )
}
