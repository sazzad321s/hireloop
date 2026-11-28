import { API_BASE_URL } from "@/lib/api/config"
import type { JobApplication } from "@/types/application"

export async function getApplications(
  query?: string
): Promise<JobApplication[]> {
  const res = await fetch(
    `${API_BASE_URL}/applications${query ? `?${query}` : ""}`,
    {
      cache: "no-store",
    }
  )

  if (!res.ok) {
    throw new Error(
      `Failed to fetch applications: ${res.status} ${res.statusText}`
    )
  }

  const data: unknown = await res.json()

  return Array.isArray(data) ? (data as JobApplication[]) : []
}

export const getApplicationCount = async (
  query = ""
): Promise<{ count: number }> => {
  const res = await fetch(
    `${API_BASE_URL}/applications/count${query ? `?${query}` : ""}`,
    {
      cache: "no-store",
    }
  )

  if (!res.ok) {
    throw new Error(
      `Failed to fetch application count: ${res.status} ${res.statusText}`
    )
  }

  return res.json()
}
