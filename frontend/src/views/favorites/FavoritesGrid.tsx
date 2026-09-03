import { ChevronDown } from "lucide-react"

import { CategoryFilters } from "@/components/Layout/CategoryFilters/CategoryFilters"
import { VideoCard } from "@/components/Layout/VideoCard/VideoCard"
import { Badge } from "@/components/UI/Badge/Badge"
import { Button } from "@/components/UI/Button/Button"
import { videos } from "@/constants/videos"

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
