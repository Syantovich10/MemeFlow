import { Sparkles } from "lucide-react"

import { Badge } from "@/components/UI/Badge/Badge"

export function AiSearchBadge() {
  return (
    <Badge variant="outline" className="h-7 px-4 text-[10px] font-semibold tracking-[0.08em] text-primary">
      <Sparkles data-icon="inline-start" />
      AI-POWERED SEARCH
    </Badge>
  )
}
