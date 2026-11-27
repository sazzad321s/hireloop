import {
  applicationStatusLabels,
  formatApplicationDate,
  getApplicationStats,
} from "@/lib/application-utils"
import type { JobApplication } from "@/types/application"

export async function exportApplicationsPdf(
  applications: JobApplication[],
  view: "active" | "archived"
) {
  // Load PDF libraries only when Export PDF is clicked.
  const [{ jsPDF }, { autoTable }] = await Promise.all([
    import("jspdf"),
    import("jspdf-autotable"),
  ])
  const doc = new jsPDF()
  const stats = getApplicationStats(applications)

  doc.setProperties({ title: "My Applications", author: "HireLoop" })
  doc.setFontSize(20)
  doc.text("My Applications", 14, 20)
  doc.setFontSize(10)
  doc.setTextColor(90)
  doc.text(`${view === "active" ? "Active" : "Archived"} applications`, 14, 28)
  doc.text(
    `Total: ${stats.total}    Shortlisted: ${stats.shortlisted}    Interviews: ${stats.interviews}    Success rate: ${stats.successRate}%`,
    14,
    36
  )

  // Export explicit report fields, never page HTML or raw API responses.
  autoTable(doc, {
    startY: 44,
    head: [
      ["Job Title", "Company", "Job Type", "Work Mode", "Applied", "Status"],
    ],
    body: applications.map((application) => [
      application.title,
      application.company,
      application.jobType,
      application.workMode,
      formatApplicationDate(application.appliedAt),
      applicationStatusLabels[application.status],
    ]),
    theme: "striped",
    styles: { fontSize: 9, cellPadding: 3, overflow: "linebreak" },
    headStyles: { fillColor: [24, 24, 27] },
    margin: { top: 14, bottom: 20 },
    rowPageBreak: "avoid",
  })

  if (!applications.length) doc.text("No applications found.", 14, 65)

  const pages = doc.getNumberOfPages()
  for (let page = 1; page <= pages; page++) {
    doc.setPage(page)
    doc.setFontSize(9)
    doc.setTextColor(110)
    doc.text(
      `Page ${page} of ${pages}`,
      14,
      doc.internal.pageSize.getHeight() - 10
    )
  }

  await doc.save(`my-applications-${view}.pdf`, { returnPromise: true })
}
