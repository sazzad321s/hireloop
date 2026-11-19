import Link from "next/link"
import {
  BadgeCheck,
  ChevronRight,
  Cloud,
  Code,
  Copy,
  EllipsisVertical,
  MapPin,
  Megaphone,
  Pencil,
  PenTool,
  Plus,
  Trash,
  Users,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

import type { Frequency, JobFormData } from "./new/page"

type JobStatus = "Active" | "Expired"

type JobPost = Pick<
  JobFormData,
  | "title"
  | "company"
  | "category"
  | "jobType"
  | "remoteAllowed"
  | "location"
  | "deadline"
  | "minSalary"
  | "maxSalary"
  | "frequency"
> & {
  id: string
  applicants: number
  status: JobStatus
  postedAt: string
  icon: LucideIcon
  iconClassName: string
}

const jobPosts: JobPost[] = [
  {
    id: "job_01",
    title: "Frontend Developer",
    company: "HirePulse Network",
    category: "Engineering & Tech",
    jobType: "Full-time",
    remoteAllowed: true,
    location: "New York, USA",
    deadline: "2025-05-30",
    minSalary: 25,
    maxSalary: 40,
    frequency: "per hour",
    applicants: 34,
    status: "Active",
    postedAt: "Posted 2d ago",
    icon: Code,
    iconClassName: "border-sky-500/20 bg-sky-500/10 text-sky-400",
  },
  {
    id: "job_02",
    title: "Senior Product Designer",
    company: "HirePulse Labs",
    category: "Design",
    jobType: "Full-time",
    remoteAllowed: false,
    location: "London, UK",
    deadline: "2025-06-14",
    minSalary: 90000,
    maxSalary: 115000,
    frequency: "per year",
    applicants: 19,
    status: "Active",
    postedAt: "Posted 5d ago",
    icon: PenTool,
    iconClassName: "border-orange-500/20 bg-orange-500/10 text-orange-400",
  },
  {
    id: "job_03",
    title: "DevOps Specialist",
    company: "HirePulse Platform",
    category: "Engineering & Tech",
    jobType: "Full-time",
    remoteAllowed: false,
    location: "Berlin, Germany",
    deadline: "2025-06-30",
    minSalary: 95000,
    maxSalary: 120000,
    frequency: "per year",
    applicants: 12,
    status: "Active",
    postedAt: "Posted 1d ago",
    icon: Cloud,
    iconClassName: "border-indigo-500/20 bg-indigo-500/10 text-indigo-400",
  },
  {
    id: "job_04",
    title: "Product Marketing Lead",
    company: "HirePulse Network",
    category: "Marketing",
    jobType: "Full-time",
    remoteAllowed: true,
    location: "EU/US",
    deadline: "2025-07-15",
    minSalary: 80000,
    maxSalary: 105000,
    frequency: "per year",
    applicants: 27,
    status: "Active",
    postedAt: "Posted 3d ago",
    icon: Megaphone,
    iconClassName: "border-violet-500/20 bg-violet-500/10 text-violet-400",
  },
  {
    id: "job_05",
    title: "QA Automation Engineer",
    company: "HirePulse Platform",
    category: "Engineering & Tech",
    jobType: "Part-time",
    remoteAllowed: false,
    location: "Dublin, Ireland",
    deadline: "2025-05-01",
    minSalary: 35,
    maxSalary: 50,
    frequency: "per hour",
    applicants: 8,
    status: "Expired",
    postedAt: "Posted 30d ago",
    icon: BadgeCheck,
    iconClassName: "border-teal-500/20 bg-teal-500/10 text-teal-400",
  },
]

const FREQUENCY_SUFFIX: Record<Frequency, string> = {
  "per hour": "/ hr",
  "per day": "/ day",
  "per week": "/ wk",
  "per month": "/ mo",
  "per year": "/ yr",
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
})

function formatDate(isoDate: string) {
  return dateFormatter.format(new Date(`${isoDate}T00:00:00`))
}

function formatCompensation(post: JobPost) {
  return `€${post.minSalary.toLocaleString("en-US")} - €${post.maxSalary.toLocaleString("en-US")} ${FREQUENCY_SUFFIX[post.frequency]}`
}

const ctaClassName =
  "bg-violet-500 text-white hover:bg-violet-400 focus-visible:ring-violet-400/50"

const ManageJobsPage = () => {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
        <div>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <Link
              href="/dashboard/recruiter"
              className="transition-colors hover:text-foreground"
            >
              Manage Jobs
            </Link>
            <ChevronRight className="size-3.5" />
            <span>Job Listings &amp; Postings</span>
          </nav>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Manage Job Posts
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/jobs/new"
          className={cn(
            buttonVariants({ size: "lg" }),
            ctaClassName,
            "h-10 rounded-xl px-4"
          )}
        >
          <Plus className="size-4" />
          New Job Post
        </Link>
      </header>

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-11 px-4 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                Job Title &amp; Dept
              </TableHead>
              <TableHead className="hidden h-11 px-4 text-[11px] font-medium tracking-wider text-muted-foreground uppercase lg:table-cell">
                Company &amp; Location
              </TableHead>
              <TableHead className="hidden h-11 px-4 text-[11px] font-medium tracking-wider text-muted-foreground uppercase md:table-cell">
                Type
              </TableHead>
              <TableHead className="hidden h-11 px-4 text-[11px] font-medium tracking-wider text-muted-foreground uppercase lg:table-cell">
                Compensation
              </TableHead>
              <TableHead className="hidden h-11 px-4 text-[11px] font-medium tracking-wider text-muted-foreground uppercase xl:table-cell">
                Applicants
              </TableHead>
              <TableHead className="h-11 px-4 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                Status
              </TableHead>
              <TableHead className="hidden h-11 px-4 text-[11px] font-medium tracking-wider text-muted-foreground uppercase md:table-cell">
                Deadline
              </TableHead>
              <TableHead className="h-11 px-4 text-right text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {jobPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-lg border",
                        post.iconClassName
                      )}
                    >
                      <post.icon className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{post.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {post.category}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="hidden px-4 py-3 lg:table-cell">
                  <p className="font-medium">{post.company}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3 shrink-0" />
                    {post.remoteAllowed
                      ? `Remote (${post.location})`
                      : post.location}
                  </p>
                </TableCell>

                <TableCell className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                  {post.jobType}
                </TableCell>

                <TableCell className="hidden px-4 py-3 lg:table-cell">
                  {formatCompensation(post)}
                </TableCell>

                <TableCell className="hidden px-4 py-3 xl:table-cell">
                  <div className="flex items-center gap-1.5">
                    <Users className="size-3.5 shrink-0 text-muted-foreground" />
                    <span className="font-semibold tabular-nums">
                      {post.applicants}
                    </span>
                    <span className="text-muted-foreground">Candidates</span>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-3">
                  <div className="flex flex-col items-start gap-1">
                    <Badge
                      variant="outline"
                      className={cn(
                        "gap-1.5",
                        post.status === "Active"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                          : "border-border bg-muted text-muted-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          post.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-muted-foreground/60"
                        )}
                      />
                      {post.status}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground">
                      {post.status === "Active" ? post.postedAt : "Closed"}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="hidden px-4 py-3 md:table-cell">
                  {formatDate(post.deadline)}
                </TableCell>

                <TableCell className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "border-violet-500/30 bg-violet-500/10 text-violet-500 hover:bg-violet-500/20 hover:text-violet-400 dark:border-violet-400/30"
                      )}
                    >
                      <Pencil className="size-3.5" />
                      <span className="hidden sm:inline">Update</span>
                    </button>
                    <button
                      type="button"
                      aria-label={`Duplicate ${post.title}`}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon-sm" }),
                        "text-muted-foreground"
                      )}
                    >
                      <Trash className="size-4" />
                    </button>
                    <button
                      type="button"
                      aria-label={`More actions for ${post.title}`}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon-sm" }),
                        "text-muted-foreground"
                      )}
                    >
                      <EllipsisVertical className="size-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ManageJobsPage
