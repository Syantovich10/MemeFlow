'use client'

import { FormEvent, useState, useEffect } from "react";
import { Search } from "lucide-react"
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { useSearchParams } from "next/navigation";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/UI/InputGroup/InputGroup"

export function SearchForm({ compact = false }: { compact?: boolean }) {
  const updateSearchParams = useUpdateSearchParams();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("query") ?? "").trim();
    updateSearchParams({'query': query}, false, 'search');
  }

  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query") ?? "";

  const [query, setQuery] = useState(queryParam);

  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  return (
    <form className={compact ? "w-full max-w-[730px]" : "w-full max-w-[780px]"} onSubmit={handleSubmit}>
      <InputGroup className={compact ? "h-11 rounded-xl border-primary/70" : "violet-outline h-16 rounded-2xl bg-card"}>
        <InputGroupInput
          name="query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search short videos"
          className={compact ? "text-sm" : "text-base"}
        />
        <InputGroupAddon align="inline-start" className="pl-5 text-primary">
          <Search aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end" className="pr-2">
          <InputGroupButton
            type="submit"
            variant="default"
            size="icon-sm"
            aria-label="Search"
            className={compact ? "size-8 rounded-lg" : "size-12 rounded-xl"}
          >
            <Search aria-hidden="true" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}
