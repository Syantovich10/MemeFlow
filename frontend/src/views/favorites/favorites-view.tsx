import { FavoritesGrid } from "@/views/favorites/favorites-states"
import { SiteHeader } from "@/components/Layout/SiteHeader/SiteHeader"

export function FavoritesView() {
  return (
    <div className="min-h-screen">
      <SiteHeader active="favorites" />
      <FavoritesGrid />
    </div>
  )
}
