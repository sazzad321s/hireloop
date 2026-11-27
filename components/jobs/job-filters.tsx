"use client"

import { JOB_CATEGORIES, JOB_TYPES } from "@/types/job"
import { useRouter, useSearchParams } from "next/navigation"

type FilterOptionProps = {
  name: string
  value: string
  label: string
  checked: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function FilterOption({ name, value, label, checked, onChange }: FilterOptionProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-400">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="size-4 shrink-0 cursor-pointer appearance-none rounded-full border border-zinc-500 bg-transparent checked:border-4 checked:border-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
      />
      {label}
    </label>
  )
}

export function JobFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.currentTarget
    const params = new URLSearchParams(searchParams.toString())

    if (checked) {
      params.set(name, value)
    } else {
      params.delete(name)
    }

    const query = params.toString()
    router.push(query ? `/browse-jobs?${query}` : "/browse-jobs", {
      scroll: false,
    })
  }

  return (
    <aside
      aria-labelledby="filters-heading"
      className="rounded-xl border border-white/5 bg-[#141416] p-5"
    >
      <h2 id="filters-heading" className="text-lg font-semibold">
        Filters
      </h2>

      <form
        onSubmit={(event) => event.preventDefault()}
        className="mt-6 space-y-6"
      >
        <fieldset className="space-y-3">
          <legend className="mb-3 text-sm font-medium text-zinc-200">
            Job Type
          </legend>
          {JOB_TYPES.map((type) => (
            <FilterOption
              key={type}
              name="jobType"
              value={type}
              label={type}
              checked={searchParams.get("jobType") === type}
              onChange={handleCheckboxChange}
            />
          ))}
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="mb-3 text-sm font-medium text-zinc-200">
            Category
          </legend>
          {JOB_CATEGORIES.map((category) => (
            <FilterOption
              key={category}
              name="category"
              value={category}
              label={category}
              checked={searchParams.get("category") === category}
              onChange={handleCheckboxChange}
            />
          ))}
        </fieldset>

        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-400">
          <input
            type="checkbox"
            name="remoteAllowed"
            value="true"
            checked={searchParams.get("remoteAllowed") === "true"}
            onChange={handleCheckboxChange}
            className="size-4 shrink-0 cursor-pointer accent-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
          />
          Remote jobs only
        </label>
      </form>
    </aside>
  )
}
