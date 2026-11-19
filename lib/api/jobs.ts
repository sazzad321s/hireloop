const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export type JobStatus = "Active" | "Expired"

/** A job document as returned by the jobs API (MongoDB shape). */
export type Job = {
  _id: string
  title: string
  company: string
  category: string
  jobType: string
  remoteAllowed: boolean
  location: string
  deadline: string
  minSalary?: number
  maxSalary?: number
  frequency: string
  /** Optional: older documents were saved before these fields existed. */
  applicants?: number
  status?: JobStatus
  postedAt?: string
}

export async function getJobs(): Promise<Job[]> {
  const res = await fetch(`${BASE_URL}/jobs`, { cache: "no-store" })

  if (!res.ok) {
    throw new Error(`Failed to fetch jobs: ${res.status} ${res.statusText}`)
  }

  const data: unknown = await res.json()

  return Array.isArray(data) ? (data as Job[]) : []
}
