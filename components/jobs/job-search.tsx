"use client"

import type { FormEvent } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function JobSearch() {
  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: Connect search submission to the jobs query.
  }

  return (
    <form
      role="search"
      aria-label="Search jobs"
      onSubmit={handleSearch}
      className="flex flex-col gap-3 rounded-xl border border-white/5 bg-[#141416] p-4 sm:flex-row sm:p-5"
    >
      <div className="relative flex-1">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-zinc-500"
        />
        <Input
          type="search"
          name="query"
          aria-label="Job title, keywords, or company"
          placeholder="Search by job title, keywords..."
          className="h-12 border-white/5 bg-white/3 pl-10 text-zinc-100 placeholder:text-zinc-500 focus-visible:border-violet-400 focus-visible:ring-violet-400/30"
        />
      </div>
      <Button
        type="submit"
        className="h-12 bg-white px-6 text-zinc-950 hover:bg-zinc-200 focus-visible:ring-violet-400/50"
      >
        Search Jobs
      </Button>
    </form>
  )
}
