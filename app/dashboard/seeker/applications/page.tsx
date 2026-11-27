import { ApplicationsDashboard } from "@/components/applications/applications-dashboard"
import { getApplications } from "@/lib/api/applications"
import { auth } from "@/lib/auth"
import {
  
  DEMO_APPLICATIONS_REFERENCE_TIME,
} from "@/lib/data/demo-applications"
import { headers } from "next/headers"

export default async function MyApplicationsPage() {

    const session = await auth.api.getSession({
        headers : await headers()
    })
    const applications = await getApplications(`applicantId=${session?.user?.id}`)

  return (
    <ApplicationsDashboard
      applications={applications}
      referenceTime={DEMO_APPLICATIONS_REFERENCE_TIME}
    />
  )
}
