export const APPLICATION_STATUSES = [
  "applied",
  "review",
  "shortlisted",
  "interview",
  "rejected",
  "offered",
] as const

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number]
export type WorkMode = "Remote" | "Hybrid" | "On-site"

/** Snapshot saved when a seeker applies, independent of later job edits. */
export type JobApplicationInput = {
  jobId: string
  userId: string
  applicantName: string
  email: string
  title: string
  company: string
  category: string
  jobType: string
  location: string
  workMode: WorkMode
  status: ApplicationStatus
  /** ISO timestamps; relative labels are computed by the UI. */
  appliedAt: string
  updatedAt: string
  archived: boolean
}

export type JobApplication = JobApplicationInput & {
  _id: string
}

export type CreateApplicationResult = {
  insertedId: string
}
