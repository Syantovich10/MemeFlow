import { Camera, Video } from "lucide-react"

import { Badge } from "@/components/UI/Badge/Badge"
import { Button } from "@/components/UI/Button/Button"
import {
  videoPlatforms,
  type VideoPlatformId,
} from "@/constants/search"

const platformIcons = {
  youtube: Video,
  tiktok: null,
  instagram: Camera,
} satisfies Record<VideoPlatformId, typeof Video | null>

const platformClassNames = {
  youtube: "h-11 min-w-40 justify-start border border-primary/35",
  tiktok: "h-11 min-w-36 justify-start text-muted-foreground",
  instagram: "hidden h-11 min-w-40 justify-start text-muted-foreground sm:flex",
} satisfies Record<VideoPlatformId, string>

export function PlatformSelector() {
  return (
    <div className="glass-panel flex max-w-full gap-1 rounded-xl border p-1.5">
      {videoPlatforms.map((platform) => {
        const Icon = platformIcons[platform.id]

        return (
          <Button
            key={platform.id}
            type="button"
            variant={platform.available ? "secondary" : "ghost"}
            className={platformClassNames[platform.id]}
          >
            {Icon ? (
              <Icon
                data-icon="inline-start"
                className={platform.id === "youtube" ? "text-red-500" : "text-pink-400"}
              />
            ) : (
              <span className="text-base" aria-hidden="true">♪</span>
            )}
            {platform.description ? (
              <span className="flex flex-col items-start text-xs leading-none">
                <span className="font-medium">{platform.label}</span>
                <span className="text-[10px] text-muted-foreground">{platform.description}</span>
              </span>
            ) : platform.label}
            {platform.available ? (
              <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">✓</span>
            ) : (
              <Badge variant="secondary" className="ml-auto">Soon</Badge>
            )}
          </Button>
        )
      })}
    </div>
  )
}
