import { API_BASE_URL } from "@/lib/api/config"
import type { Job } from "@/types/job"

export async function getJobs(query = ""): Promise<Job[]> {
  const res = await fetch(`${API_BASE_URL}/jobs?${query}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch jobs: ${res.status} ${res.statusText}`)
  }

  const data: unknown = await res.json()

  return Array.isArray(data) ? (data as Job[]) : []
}

export async function getJobById(id: string): Promise<Job | null> {

  const res = await fetch(`${API_BASE_URL}/jobs/${id}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch job by ID: ${res.status} ${res.statusText}`)
  }
  return res.json()
}
