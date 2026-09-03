import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function BackToResults() {
  return (
    <Link href="/search" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
      <ArrowLeft aria-hidden="true" /> Back to results
    </Link>
  )
}
