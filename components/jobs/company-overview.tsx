import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import officeImage from "@/app/images/company-office.jpg"
import { getWebsiteUrl } from "@/lib/job-utils"
import type { Job } from "@/types/job"

export function CompanyOverview({ job }: { job: Job }) {
  const website = getWebsiteUrl(job.companyWebsite)
  const details = [
    { label: "Size", value: job.companySize || "Not provided" },
    {
      label: "Industry",
      value: job.industry || job.category || "Not provided",
    },
  ]

  return (
    <aside
      aria-labelledby="company-overview-heading"
      className="rounded-xl border border-white/5 bg-[#141416] p-5 sm:p-6"
    >
      <h2
        id="company-overview-heading"
        className="text-lg font-semibold tracking-tight"
      >
        Company Overview
      </h2>

      <div className="relative mt-5 aspect-16/10 overflow-hidden rounded-lg bg-zinc-900">
        {/* Decorative office image, not a photo of the hiring company. */}
        <Image
          src={officeImage}
          alt=""
          fill
          placeholder="blur"
          sizes="(max-width: 1023px) 100vw, 380px"
          className="object-cover brightness-50 saturate-50"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-black/50 via-teal-950/15 to-transparent"
        />
      </div>

      <dl className="mt-3 divide-y divide-white/5">
        {details.map(({ label, value }) => (
          <div
            key={label}
            className="flex items-start justify-between gap-5 py-5"
          >
            <dt className="pt-0.5 text-[10px] font-medium tracking-wider text-zinc-500 uppercase">
              {label}
            </dt>
            <dd className="max-w-[75%] text-right text-sm text-zinc-300">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      {website ? (
        <Link
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 items-center justify-center gap-2 rounded-lg border border-white/5 bg-white/5 text-xs font-medium text-zinc-200 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-violet-400"
        >
          Visit Website
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </Link>
      ) : (
        <p className="rounded-lg border border-white/5 bg-white/3 px-3 py-3 text-center text-xs text-zinc-500">
          Company website not provided
        </p>
      )}
    </aside>
  )
}
