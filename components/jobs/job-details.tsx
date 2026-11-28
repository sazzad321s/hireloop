"use client"
import { useState, type ReactNode } from "react"
import {
  BadgeCheck,
  Banknote,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CircleCheck,
  MapPin,
} from "lucide-react"

import { CompanyOverview } from "@/components/jobs/company-overview"
import { SaveJobButton } from "@/components/jobs/save-job-button"
import { formatSalary, getWebsiteUrl } from "@/lib/job-utils"
import type { Job } from "@/types/job"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { applyToAJob } from "@/lib/actions/applications"
import { toast } from "@/components/ui/toast"
import type { JobApplicationInput } from "@/types/application"
import { getApplicationCount } from "@/lib/api/applications"

function DetailSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="py-6 first:pt-0 last:pb-0">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-200">
        {title}
      </h2>
      <div className="mt-4 text-sm leading-7 text-zinc-400">{children}</div>
    </section>
  )
}

function DetailList({ text, fallback }: { text?: string; fallback: string }) {
  const items = (text ?? "")
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*(?:[•*\-–]\s*|\d+[.)]\s+)/, "").trim())
    .filter(Boolean)

  if (!items.length) return <p>{fallback}</p>

  return (
    <ul className="list-disc space-y-2 pl-4 marker:text-zinc-300">
      {items.map((item, index) => (
        <li key={`${index}-${item}`} className="pl-2">
          {item}
        </li>
      ))}
    </ul>
  )
}

export function JobDetails({
  job,
  isExpired,
}: {
  job: Job
  isExpired: boolean
}) {
  const salary = formatSalary(job)
  const applicationUrl = getWebsiteUrl(job.applicationUrl)
  const deadline = new Date(job.deadline)
  const summary = [
    {
      label: "Salary range",
      value: salary || "Not specified",
      detail: salary ? job.frequency : undefined,
      icon: Banknote,
    },
    {
      label: "Location",
      value: job.remoteAllowed
        ? `Remote${job.location ? ` (${job.location})` : ""}`
        : job.location || "Not specified",
      icon: MapPin,
    },
    {
      label: "Job type",
      value: job.jobType || "Not specified",
      icon: BriefcaseBusiness,
    },
    {
      label: "Deadline",
      value: Number.isNaN(deadline.getTime())
        ? "Not specified"
        : deadline.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
          }),
      icon: CalendarDays,
    },
  ]

  const { data: session, isPending: isSessionPending } = useSession()
  const user = session?.user
  const router = useRouter()
  const [isApplying, setIsApplying] = useState(false)
  const handleApplyNow = async () => {
    if (isExpired || isApplying || isSessionPending) return

    if (!user) {
      router.push(
        `/sign-in?redirectTo=${encodeURIComponent(`/browse-jobs/${job._id}`)}`
      )
      return
    }

    if (user.role !== "seeker") {
      toast.add({
        title: "Only job seekers can apply for jobs.",
        type: "error",
      })
      return
    }
    setIsApplying(true)

    try {
      const query = new URLSearchParams({ applicantId: user.id })
      const countResult = await getApplicationCount(query.toString())

      if (countResult.count >= 10) {
        toast.add({
          title: "Application limit reached",
          description:
            "You have reached the limit. Please upgrade to a premium account to apply for more jobs.",
          type: "error",
        })
        router.push("/payment")
        return
      }

      const now = new Date().toISOString()
      const application: JobApplicationInput = {
        jobId: job._id,
        userId: user.id,
        applicantName: user.name,
        email: user.email,
        title: job.title,
        company: job.company,
        category: job.category,
        jobType: job.jobType,
        location: job.location,
        workMode: job.remoteAllowed ? "Remote" : "On-site",
        status: "applied",
        appliedAt: now,
        updatedAt: now,
        archived: false,
      }

      await applyToAJob(application)
      toast.add({
        title: "Application submitted successfully",
        type: "success",
      })

      if (applicationUrl) {
        window.location.assign(applicationUrl)
      } else {
        router.push("/dashboard/seeker/applications")
      }
    } catch (error) {
      toast.add({
        title: "Application could not be submitted",
        description:
          error instanceof Error ? error.message : "Please try again.",
        type: "error",
      })
    } finally {
      setIsApplying(false)
    }
  }

  return (
    <>
      <header className="flex flex-col gap-6 rounded-xl border border-white/5 bg-linear-to-r from-[#141416] to-[#19191d] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex min-w-0 items-center gap-5">
          <div
            aria-hidden="true"
            className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#101012] shadow-inner shadow-white/5 sm:size-20"
          >
            <Building2 className="size-7 text-zinc-300" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
              {job.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-base text-zinc-400 sm:text-lg">
                {job.company}
              </p>
              {job.verifiedEmployer && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                  <span aria-hidden="true" className="mr-2 text-zinc-600">
                    ·
                  </span>
                  <BadgeCheck aria-hidden="true" className="size-4" />
                  Verified Employer
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="shrink-0 sm:max-w-52">
          <div className="flex items-center gap-3 sm:justify-end">
            <SaveJobButton key={job._id} title={job.title} />
            <button
              type="button"
              disabled={isExpired || isApplying || isSessionPending}
              aria-busy={isApplying}
              onClick={handleApplyNow}
              className="h-11 cursor-pointer rounded-lg bg-zinc-100 px-5 text-sm font-semibold text-zinc-950 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 hover:enabled:bg-violet-500 hover:enabled:text-white hover:enabled:shadow-lg hover:enabled:shadow-violet-500/20 active:enabled:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isExpired
                ? "Applications Closed"
                : isApplying
                  ? "Applying…"
                  : "Apply Now"}
            </button>
          </div>
        </div>
      </header>

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,2.05fr)_minmax(0,1fr)]">
        <div className="min-w-0 space-y-5">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {summary.map(({ label, value, detail, icon: Icon }) => (
              <div
                key={label}
                className="rounded-xl border border-white/5 bg-[#141416] p-4 sm:p-5"
              >
                <dt className="text-[10px] font-medium tracking-wide text-zinc-500 uppercase">
                  <Icon
                    aria-hidden="true"
                    className="mb-2 size-5 text-zinc-400"
                  />
                  {label}
                </dt>
                <dd className="mt-1 text-sm font-medium text-zinc-200">
                  {value}
                  {detail && (
                    <span className="mt-1 block text-xs font-normal text-zinc-500">
                      {detail}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <article
            aria-label="Job details"
            className="divide-y divide-white/5 rounded-xl border border-white/5 bg-[#141416] p-6 sm:p-8"
          >
            <DetailSection title="Job Description">
              <p className="whitespace-pre-line">
                {job.description ||
                  `${job.company} is hiring a ${job.title}${job.category ? ` in ${job.category}` : ""}. Explore the responsibilities and requirements for this ${job.jobType.toLowerCase()} opportunity below.`}
              </p>
            </DetailSection>

            <DetailSection title="Responsibilities">
              <DetailList
                text={job.responsibilities}
                fallback="The employer has not provided detailed responsibilities for this role."
              />
            </DetailSection>

            <DetailSection title="Requirements">
              {!!job.skills?.length && (
                <ul
                  aria-label="Required skills"
                  className="mb-5 flex flex-wrap gap-2"
                >
                  {job.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-white/5 bg-white/3 px-3 py-1 text-xs text-zinc-300"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
              <DetailList
                text={job.qualifications}
                fallback="The employer has not listed specific requirements yet."
              />
            </DetailSection>

            <DetailSection title="Benefits">
              {job.benefits?.length ? (
                <ul className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                  {job.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-center gap-3 font-medium text-zinc-300"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/5">
                        <CircleCheck
                          aria-hidden="true"
                          className="size-5 text-zinc-400"
                        />
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  Benefits information has not been provided by the employer.
                </p>
              )}
            </DetailSection>
          </article>
        </div>

        <CompanyOverview job={job} />
      </div>
    </>
  )
}
