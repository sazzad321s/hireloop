import { API_BASE_URL } from "@/lib/api/config"
import type { Job, JobFormData } from "@/types/job"

//create job api
export async function createJob(data: JobFormData) {
  const res = await fetch(`${API_BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const result = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(result?.message ?? "Job creation failed")
  }

  return result
}

//delete job api

export async function deleteJob(
  jobId: string
): Promise<{ deletedCount?: number }> {
  const res = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
    method: "DELETE",
  })

  return res.json()
}
