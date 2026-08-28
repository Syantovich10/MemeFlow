import { Search } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/UI/InputGroup/InputGroup"

export function SearchForm({ compact = false }: { compact?: boolean }) {
  return (
    <form action="/search" className={compact ? "w-full max-w-[730px]" : "w-full max-w-[780px]"}>
      <InputGroup className={compact ? "h-11 rounded-xl border-primary/70" : "violet-outline h-16 rounded-2xl bg-card"}>
        <InputGroupInput
          name="query"
          defaultValue="жирный друг"
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
