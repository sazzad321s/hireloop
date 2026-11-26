"use client"

import { JOB_CATEGORIES, JOB_TYPES } from "@/types/job"
import { useRouter } from "next/navigation"

type FilterRadioProps = {
  name: string
  value: string
  label: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function FilterRadio({ name, value, label, onChange }: FilterRadioProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-400">
      <input
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        className="size-4 shrink-0 cursor-pointer accent-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
      />
      {label}
    </label>
  )
}

export function JobFilters() {

const router = useRouter();

 const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const params = new URLSearchParams(window.location.search)
  params.set(event.target.name, event.target.value)
  router.push(`/browse-jobs?${params.toString()}`)
 }

  return (
    <aside
      aria-labelledby="filters-heading"
      className="rounded-xl border border-white/5 bg-[#141416] p-5"
    >
      <h2 id="filters-heading" className="text-lg font-semibold">
        Filters
      </h2>

      {/* Uncontrolled inputs keep selections local until filtering is connected. */}
      <form
        onSubmit={(event) => event.preventDefault()}
        className="mt-6 space-y-6"
      >
        <fieldset className="space-y-3">
          <legend className="mb-3 text-sm font-medium text-zinc-200">
            Job Type
          </legend>
          {JOB_TYPES.map((type) => (
            <FilterRadio
              key={type}
              name="jobType"
              value={type}
              label={type}
              onChange={handleCheckboxChange}
            />
          ))}
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="mb-3 text-sm font-medium text-zinc-200">
            Category
          </legend>
          {JOB_CATEGORIES.map((category) => (
            <FilterRadio
              key={category}
              name="category"
              value={category}
              label={category}
              onChange={handleCheckboxChange}
            />
          ))}
        </fieldset>

        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-400">
          <input
            type="checkbox"
            name="remoteAllowed"
            value="true"
            onChange={handleCheckboxChange}
            className="size-4 shrink-0 cursor-pointer accent-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
          />
          Remote jobs only
        </label>
      </form>
    </aside>
  )
}
