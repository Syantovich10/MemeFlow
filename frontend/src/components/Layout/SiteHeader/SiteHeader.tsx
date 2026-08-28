import Link from "next/link"
import { Star, UserRound } from "lucide-react"

import { BrandLogo } from "@/components/Layout/BrandLogo/BrandLogo"
import { Avatar, AvatarBadge, AvatarFallback } from "@/components/UI/Avatar/Avatar"

export function SiteHeader({ active = "home" }: { active?: "home" | "favorites" }) {
  return (
    <header className="mx-auto w-full max-w-[1160px] px-4 pt-3 sm:px-6">
      <div className="glass-panel flex h-14 items-center justify-between rounded-xl border px-5 sm:h-16 sm:px-6">
        <BrandLogo />
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/favorites"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            aria-current={active === "favorites" ? "page" : undefined}
          >
            <Star
              className={active === "favorites" ? "fill-primary text-primary" : undefined}
              aria-hidden="true"
            />
            <span className="hidden sm:inline">Favorites</span>
          </Link>
          <div className="h-8 w-px bg-border" aria-hidden="true" />
          <Avatar size="lg">
            <AvatarFallback>
              <UserRound aria-hidden="true" />
            </AvatarFallback>
            <AvatarBadge />
          </Avatar>
        </div>
      </div>
    </header>
  )
}
