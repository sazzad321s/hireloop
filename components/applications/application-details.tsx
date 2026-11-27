"use client"

import { ApplicationStatus } from "@/components/applications/application-status"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { formatApplicationDate } from "@/lib/application-utils"
import type { JobApplication } from "@/types/application"

export function ApplicationDetails({
  application,
  onClose,
}: {
  application: JobApplication | null
  onClose: () => void
}) {
  return (
    <Sheet
      open={!!application}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <SheetContent className="overflow-y-auto border-white/10 bg-[#141416] text-zinc-200 sm:max-w-md">
        {application && (
          <>
            <SheetHeader className="border-b border-white/5 p-6 pr-12">
              <SheetTitle className="text-xl text-zinc-100">
                {application.title}
              </SheetTitle>
              <SheetDescription className="mt-2 text-zinc-400">
                {application.company}
              </SheetDescription>
            </SheetHeader>
            <div className="px-6">
              <ApplicationStatus status={application.status} />
            </div>
            <dl className="divide-y divide-white/5 px-6">
              {[
                ["Applicant", application.applicantName],
                ["Email", application.email],
                ["Job type", application.jobType],
                ["Work mode", application.workMode],
                ["Location", application.location],
                ["Category", application.category],
                ["Applied", formatApplicationDate(application.appliedAt)],
                ["Last updated", formatApplicationDate(application.updatedAt)],
                ["View", application.archived ? "Archived" : "Active"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-5 py-4">
                  <dt className="shrink-0 text-zinc-500">{label}</dt>
                  <dd className="text-right wrap-anywhere">{value}</dd>
                </div>
              ))}
            </dl>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
