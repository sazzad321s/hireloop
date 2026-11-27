import type { Job } from "@/types/job"

export function formatSalary(job: Pick<Job, "minSalary" | "maxSalary">) {
  const format = (amount: number) => `€${amount.toLocaleString("en-US")}`

  if (job.minSalary != null && job.maxSalary != null) {
    return `${format(job.minSalary)} – ${format(job.maxSalary)}`
  }
  if (job.minSalary != null) return `From ${format(job.minSalary)}`
  if (job.maxSalary != null) return `Up to ${format(job.maxSalary)}`

  return null
}

export function getWebsiteUrl(value?: string) {
  if (!value) return null

  try {
    const url = new URL(value)
    return ["http:", "https:"].includes(url.protocol) ? url.href : null
  } catch {
    return null
  }
}

export function isJobExpired(
  job: Pick<Job, "status" | "deadline">,
  now = Date.now()
) {
  // Date-only deadlines remain open through the end of that day in UTC.
  const deadline = Date.parse(
    job.deadline ? `${job.deadline.slice(0, 10)}T23:59:59Z` : ""
  )
  return job.status?.toLowerCase() === "expired" || deadline < now
}
