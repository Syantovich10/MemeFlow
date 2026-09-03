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
  LucideIcon
} from "lucide-react"
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/UI/Button/Button";
import { Loader } from "@/components/UI/Loader/Loader";
import { Error } from "@/components/UI/Error/Error";
import {
  type SearchCategoryId
} from "@/constants/search"

import{
  type SearchCategories
} from "@/types/searchCategories"

import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { fetchBaseQuery}  from "@/lib/fetchBaseQuery";

const categoryIcons = {
  all: Grid2X2,
  trending: Flame,
  mellstroy: Crown,
  cats: Cat,
  memes: Smile,
  gaming: Gamepad2,
  streamers: Radio,
} satisfies Record<SearchCategoryId, LucideIcon>

export function CategoryFilters({ compact = false }: { compact?: boolean }) {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const category = searchParams.get('category') || 'all';

  const { data: searchCategories = [], isLoading, isError } = useQuery({
    queryFn: () => fetchBaseQuery<SearchCategories[]>("/categories"),
    queryKey: ["category"],
  })

  if (isLoading) {
    return (
        <div className="mt-8 flex min-h-12 items-center justify-center">
          <Loader />
        </div>
    )
  }

  if(isError) {
    return <Error/>
  }

  return (
    <div className="w-full overflow-x-auto pb-1 [scrollbar-width:none]">
      <div className="mx-auto flex w-max min-w-max gap-2">
        {searchCategories.map(({ id, label }) => {
          // @ts-ignore
          const Icon = categoryIcons[id]
          const active = id === category

          return (
            <Button
              key={id}
              type="button"
              variant={active ? "secondary" : "outline"}
              size={compact ? "sm" : "default"}
              className={active ? "border-primary/70 text-primary" : undefined}
              onClick={() => updateSearchParams({category: id})}
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
