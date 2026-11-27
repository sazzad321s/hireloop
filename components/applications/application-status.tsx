import { cn } from "@/lib/utils"
import { applicationStatusLabels } from "@/lib/application-utils"
import type { ApplicationStatus as Status } from "@/types/application"

const statusStyles: Record<Status, string> = {
  applied: "border-zinc-500/20 bg-zinc-500/15 text-zinc-400",
  review: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  shortlisted: "border-blue-400/25 bg-blue-400/10 text-blue-400",
  interview: "border-violet-400/25 bg-violet-400/10 text-violet-400",
  rejected: "border-red-500/20 bg-red-500/10 text-red-400",
  offered: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
}

export function ApplicationStatus({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md border px-2 py-0.5 text-xs leading-none font-medium",
        statusStyles[status]
      )}
    >
      {applicationStatusLabels[status]}
    </span>
  )
}
