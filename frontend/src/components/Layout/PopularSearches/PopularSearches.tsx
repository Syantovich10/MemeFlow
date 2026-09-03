'use client'

import { TrendingUp } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { fetchBaseQuery } from "@/lib/fetchBaseQuery"
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams"
import { Button } from "@/components/UI/Button/Button"
import { Loader } from "@/components/UI/Loader/Loader"
import { Error } from "@/components/UI/Error/Error"

export function PopularSearches() {
    const updateSearchParams = useUpdateSearchParams()

    const {
        data: popularSearches = [],
        isLoading,
        isError
    } = useQuery({
        queryKey: ["searches"],
        queryFn: () => fetchBaseQuery<string[]>("/searches"),
    })

    if (isLoading) {
        return (
            <div className="mt-8 flex min-h-12 items-center justify-center">
                <Loader />
            </div>
        )
    }

    if (isError) {
        return <Error/>
    }

    return (
        <div className="mt-8 flex flex-col items-center gap-3">
      <span className="text-xs text-muted-foreground">
        Popular searches
      </span>

            <div className="flex flex-wrap justify-center gap-2">
                {popularSearches.map((search) => (
                    <Button
                        key={search}
                        variant="secondary"
                        size="sm"
                        className="text-muted-foreground"
                        onClick={() =>
                            updateSearchParams({ query: search }, false, "search")
                        }
                    >
                        <TrendingUp
                            data-icon="inline-start"
                            className="text-primary"
                        />
                        {search}
                    </Button>
                ))}
            </div>
        </div>
    )
}
