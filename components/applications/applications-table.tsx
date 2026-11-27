import { Braces, Code2, Database, FlaskConical, PenTool } from "lucide-react"

import { ApplicationStatus } from "@/components/applications/application-status"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  formatApplicationDate,
  formatAppliedTime,
} from "@/lib/application-utils"
import { cn } from "@/lib/utils"
import type { JobApplication } from "@/types/application"

function JobIcon({ application }: { application: JobApplication }) {
  const Icon =
    application.category === "Design"
      ? PenTool
      : /data/i.test(application.title)
        ? Database
        : /research|learning/i.test(application.title)
          ? FlaskConical
          : /cloud/i.test(application.title)
            ? Braces
            : Code2

  return (
    <span
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-md border border-white/5",
        application.status === "rejected"
          ? "bg-red-500/15 text-red-400"
          : "bg-zinc-800 text-zinc-300"
      )}
    >
      <Icon aria-hidden="true" className="size-4" />
    </span>
  )
}

export function ApplicationsTable({
  applications,
  page,
  pageSize,
  referenceTime,
  onDetails,
}: {
  applications: JobApplication[]
  page: number
  pageSize: number
  referenceTime: string
  onDetails: (application: JobApplication) => void
}) {
  const start = (page - 1) * pageSize

  return (
    <Table className="min-w-170 text-sm print:min-w-0">
      <caption className="sr-only">
        Your job applications and their current status
      </caption>
      <TableHeader className="bg-[#1c1c20]">
        <TableRow className="border-white/5 hover:bg-transparent">
          {["Job Title", "Company", "Applied", "Status", "Action"].map(
            (heading) => (
              <TableHead
                key={heading}
                className={cn(
                  "h-12 px-6 text-xs font-normal text-zinc-500",
                  heading === "Action" && "text-right print:hidden"
                )}
              >
                {heading}
              </TableHead>
            )
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.length === 0 ? (
          <TableRow className="border-white/5 hover:bg-transparent">
            <TableCell
              colSpan={5}
              className="h-48 px-6 text-center text-zinc-500"
            >
              No applications found.
            </TableCell>
          </TableRow>
        ) : (
          applications.map((application, index) => (
            <TableRow
              key={application._id}
              className={cn(
                "border-white/5 hover:bg-white/3",
                (index < start || index >= start + pageSize) &&
                  "hidden print:table-row"
              )}
            >
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <JobIcon application={application} />
                  <div>
                    <p className="font-medium text-zinc-200">
                      {application.title}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {application.jobType} <span aria-hidden="true">•</span>{" "}
                      {application.workMode}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4 text-zinc-300">
                {application.company}
              </TableCell>
              <TableCell className="px-6 py-4 text-zinc-500">
                <time
                  dateTime={application.appliedAt}
                  title={formatApplicationDate(application.appliedAt)}
                >
                  {formatAppliedTime(application.appliedAt, referenceTime)}
                </time>
              </TableCell>
              <TableCell className="px-6 py-4">
                <ApplicationStatus status={application.status} />
              </TableCell>
              <TableCell className="px-6 py-4 text-right print:hidden">
                <button
                  type="button"
                  onClick={() => onDetails(application)}
                  aria-label={`View application details for ${application.title} at ${application.company}`}
                  className="cursor-pointer rounded-md px-2 py-1.5 text-xs text-zinc-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400"
                >
                  Details
                </button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
