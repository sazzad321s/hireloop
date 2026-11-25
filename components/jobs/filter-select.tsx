import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

type FilterSelectProps = {
  label: string
  name: string
  options: readonly string[]
  placeholder?: string
  defaultValue?: string
  className?: string
}

export function FilterSelect({
  label,
  name,
  options,
  placeholder,
  defaultValue = "",
  className,
}: FilterSelectProps) {
  return (
    <label className={cn("grid gap-2 text-sm text-zinc-400", className)}>
      <span className="shrink-0">{label}</span>
      <span className="relative min-w-0">
        <select
          name={name}
          defaultValue={defaultValue}
          className="h-9 w-full appearance-none rounded-lg border border-white/10 bg-[#18181b] pr-8 pl-3 text-zinc-200 [color-scheme:dark] outline-none focus-visible:border-violet-400 focus-visible:ring-2 focus-visible:ring-violet-400/30"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-zinc-500"
        />
      </span>
    </label>
  )
}
