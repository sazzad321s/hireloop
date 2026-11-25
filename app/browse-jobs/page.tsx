import { FilterSelect } from "@/components/jobs/filter-select"
import { JobCard } from "@/components/jobs/job-card"
import { JobFilters } from "@/components/jobs/job-filters"
import { JobSearch } from "@/components/jobs/job-search"
import { Navbar } from "@/components/navbar"
import { getJobs } from "@/lib/api/jobs"
import type { Job } from "@/types/job"

type BrowseJobsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function BrowseJobsPage({
  searchParams,
}: BrowseJobsPageProps) {
  const search = await searchParams
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(search)) {
    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item))
    } else if (value !== undefined) {
      query.set(key, value)
    }
  }

  let jobs: Job[] = []
  let loadFailed = false

  try {
    jobs = await getJobs(query.toString())
  } catch (error) {
    console.error("Failed to load jobs:", error)
    loadFailed = true
  }

  return (
    <div className="min-h-svh bg-[#09090b] text-zinc-100">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <JobSearch />

        <div className="mt-6 grid items-start gap-6 md:grid-cols-[250px_minmax(0,1fr)]">
          <JobFilters />

          <section aria-labelledby="jobs-heading" className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <h1 id="jobs-heading" className="text-lg font-semibold">
                {loadFailed
                  ? "Browse Jobs"
                  : `Found ${jobs.length.toLocaleString("en-US")} Professional ${jobs.length === 1 ? "Job" : "Jobs"}`}
              </h1>
              <FilterSelect
                label="Sort by:"
                name="sort"
                options={[
                  "Most Recent",
                  "Salary: High to Low",
                  "Salary: Low to High",
                ]}
                defaultValue="Most Recent"
                className="flex items-center gap-2 text-xs"
              />
            </div>

            {loadFailed ? (
              <p
                role="alert"
                className="rounded-xl border border-white/10 bg-[#141416] p-8 text-sm text-zinc-400"
              >
                Couldn&apos;t load jobs. Please try refreshing the page.
              </p>
            ) : jobs.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-[#141416] p-10 text-center">
                <h2 className="font-medium">No jobs found</h2>
                <p className="mt-2 text-sm text-zinc-400">
                  Check back soon for new opportunities.
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {jobs.map((job) => (
                  <li key={job._id}>
                    <JobCard job={job} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
