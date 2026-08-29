'use client'

import {
  Cat,
  ChevronDown,
  Crown,
  Flame,
  Gamepad2,
  Grid2X2,
  MoreHorizontal,
  Radio,
  Smile,
} from "lucide-react"

import { Button } from "@/components/UI/Button/Button"
import {
  searchCategories,
  type SearchCategoryId,
} from "@/constants/search"

import { useUiStore } from "@/store/useUiStore"
import { useEffect } from "react";

const categoryIcons = {
  all: Grid2X2,
  trending: Flame,
  mellstroy: Crown,
  cats: Cat,
  memes: Smile,
  gaming: Gamepad2,
  streamers: Radio,
} satisfies Record<SearchCategoryId, typeof Grid2X2>

export function CategoryFilters({ compact = false }: { compact?: boolean }) {


  return (
    <div className="w-full overflow-x-auto pb-1 [scrollbar-width:none]">
      <div className="mx-auto flex w-max min-w-max gap-2">
        {searchCategories.map(({ id, label }) => {
          const activeFilter = useUiStore((state) => state.activeFilter);
          const setActiveFilter = useUiStore((state) => state.setActiveFilter);

          const Icon = categoryIcons[id]
          const active = id === activeFilter

          return (
            <Button
              key={id}
              type="button"
              variant={active ? "secondary" : "outline"}
              size={compact ? "sm" : "default"}
              className={active ? "border-primary/70 text-primary" : undefined}
              onClick={() => setActiveFilter(id)}
            >
              <Icon data-icon="inline-start" />
              {label}
            </Button>
          )
        })}
        <Button type="button" variant="outline" size={compact ? "sm" : "default"}>
          <MoreHorizontal data-icon="inline-start" />
          More
          <ChevronDown data-icon="inline-end" />
        </Button>
      </div>
    </div>
  )
}
