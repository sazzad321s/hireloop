import Link from "next/link"
import {
  ChevronRight,
  EllipsisVertical,
  MapPin,
  Pencil,
  Plus,
  Users,
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
import { getJobs } from "@/lib/api/jobs"
import { DEFAULT_JOB_STATUS, type Job } from "@/types/job"
import { cn } from "@/lib/utils"
import { DeleteJobDialog } from "@/app/components/DeleteJobDialouge"

const FREQUENCY_SUFFIX: Record<string, string> = {
  "per hour": "/ hr",
  "per day": "/ day",
  "per week": "/ wk",
  "per month": "/ mo",
  "per year": "/ yr",
}

const CATEGORY_COLORS: Record<string, string> = {
  "Engineering & Tech": "border-sky-500/20 bg-sky-500/10 text-sky-400",
  Design: "border-orange-500/20 bg-orange-500/10 text-orange-400",
  Product: "border-violet-500/20 bg-violet-500/10 text-violet-400",
  Marketing: "border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-400",
  Sales: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  Finance: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  "Customer Support": "border-teal-500/20 bg-teal-500/10 text-teal-400",
  Operations: "border-indigo-500/20 bg-indigo-500/10 text-indigo-400",
}

const DEFAULT_CATEGORY_COLOR = "border-border bg-muted text-muted-foreground"

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
})

function formatDate(value: string) {
  if (!value) {
    return "—"
  }

  // Deadline is stored as "YYYY-MM-DD"; parse it as local time so the day
  // doesn't shift backwards in negative UTC offsets.
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T00:00:00`)
    : new Date(value)

  return Number.isNaN(date.getTime()) ? "—" : dateFormatter.format(date)
}

function formatCompensation(post: Job) {
  if (post.minSalary == null && post.maxSalary == null) {
    return "—"
  }

  const suffix = FREQUENCY_SUFFIX[post.frequency] ?? ""
  const min = (post.minSalary ?? 0).toLocaleString("en-US")
  const max = (post.maxSalary ?? 0).toLocaleString("en-US")

  return `€${min} - €${max} ${suffix}`.trim()
}

const ctaClassName =
  "bg-violet-500 text-white hover:bg-violet-400 focus-visible:ring-violet-400/50"

const ManageJobsPage = async () => {
  let jobPosts: Job[] = []
  let loadFailed = false

  try {
    jobPosts = await getJobs()
  } catch (error) {
    console.error("Failed to load job posts:", error)
    loadFailed = true
  }

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
            {loadFailed ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={8}
                  className="px-4 py-10 text-center text-sm text-muted-foreground"
                >
                  Couldn&apos;t load job posts. Make sure the jobs API is
                  running, then refresh.
                </TableCell>
              </TableRow>
            ) : jobPosts.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={8}
                  className="px-4 py-10 text-center text-sm text-muted-foreground"
                >
                  No job posts yet.{" "}
                  <Link
                    href="/dashboard/recruiter/jobs/new"
                    className="font-medium text-violet-500 hover:text-violet-400"
                  >
                    Create your first listing.
                  </Link>
                </TableCell>
              </TableRow>
            ) : (
              jobPosts.map((post) => {
                const categoryColor =
                  CATEGORY_COLORS[post.category] ?? DEFAULT_CATEGORY_COLOR
                const initial = post.title.trim().charAt(0).toUpperCase() || "?"
                const status = (post.status ?? DEFAULT_JOB_STATUS).toLowerCase()
                const isActive = status === "active"
                const statusLabel = isActive ? "Active" : "Expired"
                const statusCaption = isActive
                  ? (post.postedAt ?? "Posted recently")
                  : "Closed"

                return (
                  <TableRow key={post._id}>
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex size-9 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold",
                            categoryColor
                          )}
                        >
                          {initial}
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
                          {post.applicants ?? 0}
                        </span>
                        <span className="text-muted-foreground">
                          Candidates
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      <div className="flex flex-col items-start gap-1">
                        <Badge
                          variant="outline"
                          className={cn(
                            "gap-1.5",
                            isActive
                              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                              : "border-border bg-muted text-muted-foreground"
                          )}
                        >
                          <span
                            className={cn(
                              "size-1.5 rounded-full",
                              isActive
                                ? "bg-emerald-500"
                                : "bg-muted-foreground/60"
                            )}
                          />
                          {statusLabel}
                        </Badge>
                        <span className="text-[11px] text-muted-foreground">
                          {statusCaption}
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
                        <DeleteJobDialog job={post} />
                        <button
                          type="button"
                          aria-label={`More actions for ${post.title}`}
                          className={cn(
                            buttonVariants({
                              variant: "ghost",
                              size: "icon-sm",
                            }),
                            "text-muted-foreground"
                          )}
                        >
                          <EllipsisVertical className="size-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ManageJobsPage
