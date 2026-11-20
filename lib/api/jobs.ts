import { API_BASE_URL } from "@/lib/api/config"
import type { Job } from "@/types/job"

export async function getJobs(): Promise<Job[]> {
  const res = await fetch(`${API_BASE_URL}/jobs`, { cache: "no-store" })

  if (!res.ok) {
    throw new Error(`Failed to fetch jobs: ${res.status} ${res.statusText}`)
  }

  const data: unknown = await res.json()

  return Array.isArray(data) ? (data as Job[]) : []
}
