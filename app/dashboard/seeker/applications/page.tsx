import { ApplicationsDashboard } from "@/components/applications/applications-dashboard"
import {
  demoApplications,
  DEMO_APPLICATIONS_REFERENCE_TIME,
} from "@/lib/data/demo-applications"

export default function MyApplicationsPage() {
  return (
    <ApplicationsDashboard
      applications={demoApplications}
      referenceTime={DEMO_APPLICATIONS_REFERENCE_TIME}
    />
  )
}
