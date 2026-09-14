import { Skeleton } from "@/components/UI/Skeleton/Skeleton"

export function SearchResultsSkeleton() {
  return (
      <>
          {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-2">
                  <Skeleton className="aspect-[3/4] w-full rounded-xl" />
                  <Skeleton className="h-3 w-[88%]" />
                  <Skeleton className="h-3 w-[66%]" />
                  <div className="flex items-center gap-2 pt-1">
                      <Skeleton className="size-5 rounded-full" />
                      <Skeleton className="h-2.5 w-14" />
                  </div>
              </div>
          ))}
      </>
  )
}
