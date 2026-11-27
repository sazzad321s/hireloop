import { notFound } from "next/navigation"

import { JobDetails } from "@/components/jobs/job-details"
import { Navbar } from "@/components/navbar"
import { getJob } from "@/lib/api/jobs"
import { isJobExpired } from "@/lib/job-utils"

type JobDetailsPageProps = {
  params: Promise<{ id: string }>
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = await params
  const job = await getJob(id)

  if (!job) notFound()

  return (
    <div className="min-h-svh bg-[#09090b] text-zinc-100">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <JobDetails job={job} isExpired={isJobExpired(job)} />
      </main>
    </div>
  )
}
