import { SearchResults } from "@/views/search/search-states"
import { SiteHeader } from "@/components/Layout/SiteHeader/SiteHeader"

export function SearchView() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="pt-5">
        <SearchResults />
      </main>
    </div>
  )
}
