import { TrendingUp } from "lucide-react"

import { Button } from "@/components/UI/Button/Button"
import { popularSearches } from "@/constants/search"

export function PopularSearches() {
  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      <span className="text-xs text-muted-foreground">Popular searches</span>
      <div className="flex flex-wrap justify-center gap-2">
        {popularSearches.map((search) => (
          <Button key={search} variant="secondary" size="sm" className="text-muted-foreground">
            <TrendingUp data-icon="inline-start" className="text-primary" />
            {search}
          </Button>
        ))}
      </div>
    </div>
  )
}
