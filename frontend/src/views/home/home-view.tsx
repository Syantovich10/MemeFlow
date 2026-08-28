import { AiSearchBadge } from "@/components/Layout/AiSearchBadge/AiSearchBadge"
import { PopularSearches } from "@/components/Layout/PopularSearches/PopularSearches"
import { SearchControls } from "@/components/Layout/SearchControls/SearchControls"
import { SiteHeader } from "@/components/Layout/SiteHeader/SiteHeader"

export function HomeView() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-[1120px] flex-col items-center px-4 pb-12 pt-16 text-center sm:px-6 sm:pt-20">
        <AiSearchBadge />
        <h1 className="mt-5 text-5xl font-bold tracking-[-0.045em] sm:text-7xl">
          Find that clip<span className="text-primary">.</span>
        </h1>
        <p className="mb-10 mt-3 text-base text-muted-foreground sm:text-lg">
          Search short videos by meaning, context and creator.
        </p>
        <SearchControls />
        <PopularSearches />
      </main>
    </div>
  )
}
