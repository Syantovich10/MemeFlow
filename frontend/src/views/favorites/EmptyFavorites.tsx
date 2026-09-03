import Link from "next/link"
import { Compass, Heart } from "lucide-react"

import { buttonVariants } from "@/components/UI/Button/Button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/UI/Empty/Empty"
import { cn } from "@/lib/utils"

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
