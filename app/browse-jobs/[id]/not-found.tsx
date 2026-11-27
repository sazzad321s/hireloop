import Link from "next/link"

import { Navbar } from "@/components/navbar"

export default function JobNotFound() {
  return (
    <div className="min-h-svh bg-[#09090b] text-zinc-100">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-white/5 bg-[#141416] p-10 text-center">
          <h1 className="text-2xl font-semibold">Job not found</h1>
          <p className="mt-3 text-sm text-zinc-400">
            This listing may have been removed or is no longer available.
          </p>
          <Link
            href="/browse-jobs"
            className="mt-6 inline-flex rounded-lg bg-violet-500 px-5 py-3 text-sm font-medium text-white hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
          >
            Browse jobs
          </Link>
        </div>
      </main>
    </div>
  )
}
