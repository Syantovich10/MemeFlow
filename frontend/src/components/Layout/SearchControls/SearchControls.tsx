

import { CategoryFilters } from "@/components/Layout/CategoryFilters/CategoryFilters"
import { PlatformSelector } from "@/components/Layout/PlatformSelector/PlatformSelector"
import { SearchForm } from "@/components/Layout/SearchForm/SearchForm"

export function SearchControls({ compact = false }: { compact?: boolean }) {
    return (
    <div className="flex w-full flex-col items-center gap-5">
      <SearchForm compact={compact} />
      <div className="w-full max-w-[1020px]">
        <CategoryFilters compact={compact} />
      </div>
      <PlatformSelector />
    </div>
  )
}
