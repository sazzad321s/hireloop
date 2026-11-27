"use client"

import Link from "next/link"

import { Navbar } from "@/components/navbar"

export default function JobDetailsError({ retry }: { retry: () => void }) {
  return (
    <div className="min-h-svh bg-[#09090b] text-zinc-100">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div
          role="alert"
          className="rounded-xl border border-white/5 bg-[#141416] p-10 text-center"
        >
          <h1 className="text-2xl font-semibold">
            Couldn&apos;t load this job
          </h1>
          <p className="mt-3 text-sm text-zinc-400">
            Please try again in a moment.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={retry}
              className="rounded-lg bg-violet-500 px-5 py-3 text-sm font-medium text-white hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
            >
              Try again
            </button>
            <Link
              href="/browse-jobs"
              className="rounded text-sm text-zinc-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
            >
              Back to jobs
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
