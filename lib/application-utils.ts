import type { ApplicationStatus, JobApplication } from "@/types/application"

export const applicationStatusLabels: Record<ApplicationStatus, string> = {
  applied: "Applied",
  review: "Review",
  shortlisted: "Shortlisted",
  interview: "Interview",
  rejected: "Rejected",
  offered: "Offered",
}

export function getApplicationStats(applications: JobApplication[]) {
  const count = (status: JobApplication["status"]) =>
    applications.filter((application) => application.status === status).length

  return {
    total: applications.length,
    shortlisted: count("shortlisted"),
    interviews: count("interview"),
    successRate: applications.length
      ? Math.round((count("offered") / applications.length) * 100)
      : 0,
  }
}

export function formatApplicationDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "Not available"

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}

export function formatAppliedTime(value: string, referenceTime: string) {
  const elapsed = Date.parse(referenceTime) - Date.parse(value)
  if (!Number.isFinite(elapsed)) return "Not available"

  const minutes = Math.max(0, Math.floor(elapsed / 60_000))
  if (minutes < 1) return "Just now"
  if (minutes < 60)
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`

  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} ${days === 1 ? "day" : "days"} ago`
  if (days < 30) {
    const weeks = Math.floor(days / 7)
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`
  }

  return formatApplicationDate(value)
}
