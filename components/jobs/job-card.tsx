import {
  Banknote,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  Globe,
} from "lucide-react"

import type { Job } from "@/types/job"
import { formatSalary } from "@/lib/job-utils"
import Link from "next/link"

const badgeClassName =
  "inline-flex items-center gap-1.5 rounded-md border border-white/5 bg-white/3 px-2 py-1 text-xs text-zinc-300"

export function JobCard({ job }: { job: Job }) {
  const salary = formatSalary(job)

  return (
    <Link href={`/browse-jobs/${job._id}`}>
    <article className="flex gap-4 rounded-xl border border-white/5 bg-[#141416] p-5 transition-colors hover:border-white/15 sm:p-6">
      <div
        aria-hidden="true"
        className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-white/5 bg-zinc-800/70"
      >
        <Building2 className="size-6 text-violet-300/70" />
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="text-base font-semibold text-zinc-100 sm:text-lg">
          {job.title}
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          {job.company} · {job.location}
          {job.remoteAllowed && " (Remote)"}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {salary && (
            <span className={badgeClassName}>
              <Banknote aria-hidden="true" className="size-3.5" />
              {salary} {job.frequency}
            </span>
          )}
          <span className={badgeClassName}>
            <BriefcaseBusiness aria-hidden="true" className="size-3.5" />
            {job.jobType}
          </span>
          {job.remoteAllowed && (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/15 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-400">
              <Globe aria-hidden="true" className="size-3.5" />
              Remote
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        aria-label={`Save ${job.title} at ${job.company}`}
        className="flex size-8 shrink-0 items-center justify-center rounded-md text-zinc-500 outline-none hover:bg-white/5 hover:text-zinc-200 focus-visible:ring-2 focus-visible:ring-violet-400"
      >
        <Bookmark aria-hidden="true" className="size-4" />
      </button>
    </article>
    </Link>
  )
}
