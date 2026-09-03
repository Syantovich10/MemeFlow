'use client'

import { Camera, Check, Music2, Video } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query";

import { Badge } from "@/components/UI/Badge/Badge"
import { Button } from "@/components/UI/Button/Button"
import { Loader } from "@/components/UI/Loader/Loader";
import { Error } from "@/components/UI/Error/Error"

import {
  type VideoPlatformId,
} from "@/constants/search"
import {
  type VideoPlatform
} from "@/types/videoPlatform"
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams"
import { fetchBaseQuery } from "@/lib/fetchBaseQuery";

const platformIcons = {
  youtube: Video,
  tiktok: Music2,
  instagram: Camera,
} satisfies Record<VideoPlatformId, typeof Video>


export function PlatformSelector() {
  const searchParams = useSearchParams()
  const updateSearchParams = useUpdateSearchParams()
  const { data: videoPlatforms = [], isLoading, isError } = useQuery({
    queryFn: () => fetchBaseQuery<VideoPlatform[]>("/platforms"),
    queryKey: ['platform'],
  })

  if (isLoading) {
    return (
        <div className="mt-8 flex min-h-12 items-center justify-center">
          <Loader />
        </div>
    )
  }

  if (isError) {
    return <Error/>
  }

  const requestedPlatform = searchParams.get("socialNetwork")
  const selectedPlatform = videoPlatforms.find(
    ({ id, available }) => available && id === requestedPlatform
  )?.id ?? "youtube"

  return (
    <div className="w-full overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div
        className="glass-panel mx-auto flex w-max min-w-max gap-1 rounded-xl border p-1.5"
        role="group"
        aria-label="Video platform"
      >
        {videoPlatforms.map((platform) => {
          // @ts-ignore
          const Icon = platformIcons[platform.id]
          const active = platform.id === selectedPlatform
          if(!platform.label) return null

          return (
            <Button
              key={platform.id}
              type="button"
              variant={active ? "secondary" : "ghost"}
              className={active ? `${platform.classNames} border-primary/35` : platform.classNames}
              disabled={!platform.available}
              aria-pressed={active}
              onClick={() =>
                updateSearchParams({ socialNetwork: platform.id })
              }
            >
              <Icon
                data-icon="inline-start"
                className={platform.id === "youtube" ? "text-red-500" : "text-pink-400"}
                aria-hidden="true"
              />
              {platform.description ? (
                <span className="flex flex-col items-start text-xs leading-none">
                  <span className="font-medium">{platform.label}</span>
                  <span className="text-[10px] text-muted-foreground">{platform.description}</span>
                </span>
              ) : platform.label}
              {active ? (
                <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3" aria-hidden="true" />
                  <span className="sr-only">Selected</span>
                </span>
              ) : (
                !platform.available && (
                  <Badge variant="secondary" className="ml-auto">Soon</Badge>
                )
              )}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
