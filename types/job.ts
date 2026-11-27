// Shared job domain types and constants.
// Keep these in one place so the form, API client and server actions can never
// drift apart.

export const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
] as const

export type JobType = (typeof JOB_TYPES)[number]

export const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Finance",
  "Customer Support",
  "Operations",
  "Other",
] as const

export type JobCategory = (typeof JOB_CATEGORIES)[number]

export const FREQUENCIES = [
  "per hour",
  "per day",
  "per week",
  "per month",
  "per year",
] as const

export type Frequency = (typeof FREQUENCIES)[number]

export const JOB_STATUSES = ["active", "expired"] as const

export type JobStatus = (typeof JOB_STATUSES)[number]

export const DEFAULT_JOB_STATUS: JobStatus = "active"

export const DEFAULT_JOB_APPLICANTS = 0

/** Payload collected by the "Post a new job" form and sent to the jobs API. */
export type JobFormData = {
  title: string
  company: string
  category: JobCategory
  jobType: JobType
  remoteAllowed: boolean
  location: string
  deadline: string
  minSalary: number
  maxSalary: number
  frequency: Frequency
  responsibilities: string
  qualifications: string
  status: JobStatus
  applicants: number
}

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
  responsibilities?: string
  qualifications?: string
  /** Optional: older documents were saved before these fields existed. */
  applicants?: number
  status?: JobStatus
  postedAt?: string
  /** Optional details: older listings and the basic posting form omit these. */
  description?: string
  experience?: string
  skills?: string[]
  benefits?: string[]
  companySize?: string
  industry?: string
  companyWebsite?: string
  verifiedEmployer?: boolean
  applicationUrl?: string
}
