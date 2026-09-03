import { SiteHeader } from "@/components/Layout/SiteHeader/SiteHeader"
import { SearchResults } from "@/views/search/SearchResults"

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
