"use client"

import { useState } from "react"
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  Search,
  UserRound,
} from "lucide-react"

import { ApplicationDetails } from "@/components/applications/application-details"
import { applicationStatusLabels } from "@/components/applications/application-status"
import { ApplicationsTable } from "@/components/applications/applications-table"
import { Input } from "@/components/ui/input"
import { getApplicationStats } from "@/lib/application-utils"
import { useSession } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import type { JobApplication } from "@/types/application"

const PAGE_SIZE = 5
const paginationButtonClass =
  "flex size-8 cursor-pointer items-center justify-center rounded-lg border border-white/10 text-xs text-zinc-500 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400 disabled:cursor-not-allowed disabled:opacity-40"

export function ApplicationsDashboard({
  applications,
  referenceTime,
}: {
  applications: JobApplication[]
  referenceTime: string
}) {
  const [query, setQuery] = useState("")
  const [view, setView] = useState<"active" | "archived">("active")
  const [page, setPage] = useState(1)
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null)
  const { data: session } = useSession()
  const stats = getApplicationStats(applications)
  const search = query.trim().toLowerCase()
  const filteredApplications = applications
    .filter((application) => application.archived === (view === "archived"))
    .filter((application) =>
      [
        application.title,
        application.company,
        application.jobType,
        application.workMode,
        applicationStatusLabels[application.status],
      ].some((value) => value.toLowerCase().includes(search))
    )
    .sort((a, b) => Date.parse(b.appliedAt) - Date.parse(a.appliedAt))
  const pageCount = Math.max(
    1,
    Math.ceil(filteredApplications.length / PAGE_SIZE)
  )
  const currentPage = Math.min(page, pageCount)
  const start = (currentPage - 1) * PAGE_SIZE
  const firstPage = Math.max(1, Math.min(currentPage - 1, pageCount - 2))
  const visiblePages = Array.from(
    { length: Math.min(3, pageCount) },
    (_, index) => firstPage + index
  )
  const summary = [
    { label: "Total Applied", value: stats.total, color: "text-zinc-100" },
    { label: "Shortlisted", value: stats.shortlisted, color: "text-zinc-100" },
    { label: "Interviews", value: stats.interviews, color: "text-amber-400" },
    {
      label: "Success Rate",
      value: `${stats.successRate}%`,
      color: "text-emerald-400",
    },
  ]

  return (
    <div
      className={cn(
        "min-h-[calc(100svh-2rem)] bg-[#0e0e10] text-zinc-200",
        "print:min-h-0 print:bg-white! print:text-black!",
        "print:**:border-[#ddd]! print:**:bg-transparent! print:**:text-black! print:**:shadow-none!",
        "print:[&_table]:w-full print:[&_table]:whitespace-normal print:[&_td]:p-2.5 print:[&_td]:whitespace-normal print:[&_th]:p-2.5 print:[&_th]:whitespace-normal print:[&_tr]:break-inside-avoid",
        "print:[body:has(&)_[data-slot=sidebar-trigger]]:hidden! print:[body:has(&)_[data-slot=sidebar]]:hidden!"
      )}
    >
      <div className="flex h-16 items-center justify-between gap-4 border-b border-white/5 px-4 sm:px-6 lg:px-8 print:hidden">
        <div className="relative w-full max-w-sm">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500"
          />
          <Input
            type="search"
            aria-label="Search applications"
            placeholder="Search applications..."
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(1)
            }}
            className="h-9 border-white/10 bg-transparent pl-9 text-sm text-zinc-200 placeholder:text-zinc-500 focus-visible:border-violet-400 focus-visible:ring-violet-400/20"
          />
        </div>
        <div className="flex shrink-0 items-center gap-5 text-zinc-400">
          <Bell aria-hidden="true" className="hidden size-4 sm:block" />
          <Mail aria-hidden="true" className="hidden size-4 sm:block" />
          <span
            aria-label={session?.user.name || "Your profile"}
            className="flex size-8 items-center justify-center rounded-full border border-violet-400/20 bg-violet-400/10 text-xs font-semibold text-violet-200"
          >
            {session?.user.name ? (
              session.user.name.trim().slice(0, 2).toUpperCase()
            ) : (
              <UserRound aria-hidden="true" className="size-4" />
            )}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              My Applications
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Track your job applications and interview progress in real-time.
            </p>
          </div>
          <div className="flex items-center gap-3 print:hidden">
            <div
              role="group"
              aria-label="Application view"
              className="flex rounded-lg border border-white/5 bg-[#1c1c20] p-1"
            >
              {(["active", "archived"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={view === option}
                  onClick={() => {
                    setView(option)
                    setPage(1)
                  }}
                  className={cn(
                    "cursor-pointer rounded-md border border-transparent px-4 py-1.5 text-xs capitalize transition-colors focus-visible:outline-2 focus-visible:outline-violet-400",
                    view === option
                      ? "border-white/10 bg-[#242428] text-zinc-100 shadow-sm"
                      : "text-zinc-500 hover:text-zinc-200"
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              title="Print or save as PDF"
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-zinc-100 px-4 text-xs font-semibold text-zinc-900 transition-colors hover:bg-violet-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
            >
              <Download aria-hidden="true" className="size-4" />
              Export PDF
            </button>
          </div>
        </header>

        <dl className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {summary.map(({ label, value, color }) => (
            <div
              key={label}
              className="rounded-xl border border-white/5 bg-[#141416] px-5 py-4"
            >
              <dt className="text-xs text-zinc-500">{label}</dt>
              <dd
                className={cn(
                  "mt-2 text-3xl font-semibold tracking-tight tabular-nums",
                  color
                )}
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <section
          aria-label={`${view} applications`}
          className="mt-6 overflow-hidden rounded-xl border border-white/5 bg-[#141416]"
        >
          <ApplicationsTable
            applications={filteredApplications}
            page={currentPage}
            pageSize={PAGE_SIZE}
            referenceTime={referenceTime}
            onDetails={setSelectedApplication}
          />
          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 bg-[#1c1c20] px-6 py-4 print:hidden">
            <p aria-live="polite" className="text-xs text-zinc-500">
              Showing {filteredApplications.length ? start + 1 : 0}–
              {Math.min(start + PAGE_SIZE, filteredApplications.length)} of{" "}
              {filteredApplications.length} applications
            </p>
            <nav
              aria-label="Applications pagination"
              className="flex items-center gap-2"
            >
              <button
                type="button"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
                className={paginationButtonClass}
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
              </button>
              {visiblePages.map((number) => (
                <button
                  key={number}
                  type="button"
                  aria-label={`Page ${number}`}
                  aria-current={currentPage === number ? "page" : undefined}
                  onClick={() => setPage(number)}
                  className={cn(
                    paginationButtonClass,
                    currentPage === number &&
                      "border-white bg-white text-zinc-950 hover:bg-zinc-200 hover:text-zinc-950"
                  )}
                >
                  {number}
                </button>
              ))}
              <button
                type="button"
                aria-label="Next page"
                disabled={currentPage === pageCount}
                onClick={() => setPage(currentPage + 1)}
                className={paginationButtonClass}
              >
                <ChevronRight aria-hidden="true" className="size-4" />
              </button>
            </nav>
          </footer>
        </section>
      </div>

      <ApplicationDetails
        application={selectedApplication}
        onClose={() => setSelectedApplication(null)}
      />
    </div>
  )
}
