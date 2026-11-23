import { API_BASE_URL } from "@/lib/api/config"
import type {  JobFormData } from "@/types/job"

// Relative label stored with the document, e.g. "Posted 3d ago".
function formatPostedAt(date: Date) {
  const days = Math.max(
    0,
    Math.floor((Date.now() - date.getTime()) / 86_400_000)
  )

  return days === 0 ? "Posted just now" : `Posted ${days}d ago`
}

//create job api
export async function createJob(data: JobFormData) {
  const payload = { ...data, postedAt: formatPostedAt(new Date()) }

  const res = await fetch(`${API_BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
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
