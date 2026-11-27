import { API_BASE_URL } from "@/lib/api/config"
import type {
  CreateApplicationResult,
  JobApplicationInput,
} from "@/types/application"

export async function applyToAJob(
  data: JobApplicationInput
): Promise<CreateApplicationResult> {
  const res = await fetch(`${API_BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  const result: unknown = await res.json().catch(() => null)

  if (!res.ok) {
    const message =
      result &&
      typeof result === "object" &&
      "message" in result &&
      typeof result.message === "string"
        ? result.message
        : "Could not submit your application. Please try again."
    throw new Error(message)
  }

  if (
    !result ||
    typeof result !== "object" ||
    !("insertedId" in result) ||
    typeof result.insertedId !== "string" ||
    !result.insertedId
  ) {
    throw new Error(
      "The server did not confirm your application. Please try again."
    )
  }

  return { insertedId: result.insertedId }
}
