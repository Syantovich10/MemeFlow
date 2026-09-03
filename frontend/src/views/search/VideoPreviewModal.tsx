import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Play,
  Star,
  Video,
  X,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar/Avatar"
import { Badge } from "@/components/UI/Badge/Badge"
import { Button } from "@/components/UI/Button/Button"
import { Card } from "@/components/UI/Card/Card"
import { videos } from "@/constants/videos"

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
            <h2 className="max-w-xs text-3xl font-bold">Р–РёСЂРЅС‹Р№ РґСЂСѓРі СЃС‡Р°СЃС‚Р»РёРІ<span className="text-primary">.</span></h2>
            <p className="mt-3 text-sm text-muted-foreground">125.4K views В· 2 weeks ago</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><Video className="text-red-500" /> YouTube</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button><Star data-icon="inline-start" /> Add to Favorites</Button>
            <Button variant="outline"><ExternalLink data-icon="inline-start" /> Open on YouTube</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Р¶РёСЂРЅС‹Р№ РєРѕС‚", "РєРѕС‚РёРєРё", "РјРёР»РѕС‚Р°", "СЃС‡Р°СЃС‚СЊРµ", "funny cat"].map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
          </div>
        </div>
        <Button type="button" variant="ghost" size="icon" aria-label="Previous video" className="absolute -left-16 top-1/2 hidden md:flex"><ChevronLeft /></Button>
        <Button type="button" variant="ghost" size="icon" aria-label="Next video" className="absolute -right-16 top-1/2 hidden md:flex"><ChevronRight /></Button>
      </Card>
    </div>
  )
}
