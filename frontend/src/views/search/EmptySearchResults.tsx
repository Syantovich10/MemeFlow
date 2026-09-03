import Link from "next/link"
import { Compass, Play, SearchX } from "lucide-react"

import { SearchControls } from "@/components/Layout/SearchControls/SearchControls"
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
