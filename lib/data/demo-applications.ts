import type {
  ApplicationStatus,
  JobApplication,
  WorkMode,
} from "@/types/application"

// Replace this fixture at the page boundary when the applications API is wired in.
export const DEMO_APPLICATIONS_REFERENCE_TIME = "2026-11-27T12:00:00.000Z"

type DemoJob = [
  title: string,
  company: string,
  workMode: WorkMode,
  status: ApplicationStatus,
]

const jobs: DemoJob[] = [
  ["Senior Frontend Engineer", "Stark Industries", "Remote", "applied"],
  ["Product Designer", "Cyberdyne Systems", "Hybrid", "review"],
  ["Lead Data Scientist", "Wayne Enterprises", "On-site", "shortlisted"],
  ["Cloud Architect", "Oscorp Tech", "Remote", "rejected"],
  ["AI Research Engineer", "Hooli Corp", "Hybrid", "offered"],
  ["Full Stack Developer", "Acme Labs", "Remote", "shortlisted"],
  ["UX Designer", "Linear Studio", "Hybrid", "interview"],
  ["DevOps Engineer", "CloudScale AI", "Remote", "shortlisted"],
  ["Backend Engineer", "Northstar", "On-site", "review"],
  ["Mobile Developer", "Orbit Digital", "Remote", "shortlisted"],
  ["Product Manager", "Notion Labs", "Hybrid", "interview"],
  ["Platform Engineer", "Vercel", "Remote", "offered"],
  ["Security Engineer", "Sentinel", "Hybrid", "shortlisted"],
  ["Data Analyst", "Atlas Analytics", "On-site", "applied"],
  ["Design Engineer", "Figma", "Remote", "shortlisted"],
  ["Software Engineer", "Nova Systems", "Hybrid", "interview"],
  ["QA Engineer", "HirePulse", "On-site", "review"],
  ["Engineering Manager", "Brightworks", "Remote", "shortlisted"],
  ["Frontend Developer", "Pixel Craft", "Hybrid", "offered"],
  ["Machine Learning Engineer", "DeepSignal", "Remote", "shortlisted"],
  ["Technical Writer", "Readme Studio", "Remote", "applied"],
  ["Solutions Architect", "Cloud Nine", "Hybrid", "review"],
  ["Web Developer", "Evergreen", "On-site", "rejected"],
  ["UI Designer", "Forma", "Hybrid", "rejected"],
]

export const demoApplications: JobApplication[] = jobs.map(
  ([title, company, workMode, status], index) => {
    const daysAgo = [2 / 24, 1, 4, 7, 14][index] ?? index + 10
    const appliedAt = new Date(
      Date.parse(DEMO_APPLICATIONS_REFERENCE_TIME) - daysAgo * 86_400_000
    ).toISOString()

    return {
      _id: `demo-application-${index + 1}`,
      jobId: `demo-job-${index + 1}`,
      userId: "demo-seeker",
      applicantName: "Alex Morgan",
      email: "alex@example.com",
      title,
      company,
      category: /design/i.test(title) ? "Design" : "Engineering & Tech",
      jobType: index === 1 ? "Contract" : "Full-time",
      location: workMode === "Remote" ? "Worldwide" : "New York, US",
      workMode,
      status,
      appliedAt,
      updatedAt: appliedAt,
      archived: index >= 22,
    }
  }
)
