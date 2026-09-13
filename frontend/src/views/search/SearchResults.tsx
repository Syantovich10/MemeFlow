'use client'

import { useQuery } from "@tanstack/react-query";
import { fetchIdsByQuery } from "@/lib/fetchIdsByQuery";
import { useSearchParams } from "next/navigation";

import { SearchControls } from "@/components/Layout/SearchControls/SearchControls"
import { VideoCard } from "@/components/Layout/VideoCard/VideoCard"
import { Loader } from "@/components/UI/Loader/Loader";
import { Error } from "@/components/UI/Error/Error";


export function SearchResults() {
  const searchParams = useSearchParams();

  const query = searchParams.get('query');
  const category = searchParams.get('category') === "all" ? "" : searchParams.get('category');
  const socialNetwork = searchParams.get('socialNetwork');

  const searchQuery = [
      query?.trim(),
      category?.trim(),
      'shorts',
  ]
      .filter(Boolean)
      .join(' ');

    const { data: video = [], isLoading, isError } = useQuery({
        queryKey: ['videos', query, category, socialNetwork],
        queryFn: () =>
            fetchIdsByQuery({
                query: searchQuery,
            }),
        enabled: Boolean(query || category),
    });


  return (
    <section className="mx-auto flex w-full max-w-[1120px] flex-col items-center gap-4 px-4 pb-12 sm:px-6">
      <SearchControls compact />
      <p className="text-sm text-muted-foreground">{video.length} videos found</p>
        {isLoading ? <Loader/> : null}
        {isError ? <Error/> : null}
      <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {video.map((video) => <VideoCard key={video.id} video={video} />)}
      </div>
    </section>
  )
}
