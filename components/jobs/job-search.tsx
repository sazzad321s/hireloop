"use client"


import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export function JobSearch() {

  const router = useRouter()

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log(data)
    const search = data.searchField as string
    const params = new URLSearchParams({ search })
    router.push(`/browse-jobs?${params.toString()}`)
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
          type="text"
          name="searchField"
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
