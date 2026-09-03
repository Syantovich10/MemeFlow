import { SiteHeader } from "@/components/Layout/SiteHeader/SiteHeader"
import { FavoritesGrid } from "@/views/favorites/FavoritesGrid"

export function FavoritesView() {
  return (
    <div className="min-h-screen">
      <SiteHeader active="favorites" />
      <FavoritesGrid />
    </div>
  )
}
