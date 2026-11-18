'use client';
import {
  Bookmark,
  Briefcase,
  Building,
  CreditCard,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import { DEFAULT_USER_ROLE, isUserRole, type UserRole } from "@/lib/user-roles"

type MenuItem = {
  name: string
  url: string
  icon: LucideIcon
}

const menuItemsbyRole: Record<UserRole, MenuItem[]> = {
  seeker: [
    { name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { name: "Jobs", url: "/dashboard/seeker/jobs", icon: Briefcase },
    { name: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: Bookmark },
    {
      name: "Applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
    },
    { name: "Billing", url: "/dashboard/seeker/billing", icon: CreditCard },
    { name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],
  recruiter: [
    { name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    { name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: Briefcase },
    {
      name: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: FileText,
    },
    { name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],
  admin: [
    { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Users", url: "/dashboard/admin/users", icon: Users },
    { name: "Companies", url: "/dashboard/admin/companies", icon: Building },
    { name: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
    { name: "Payments", url: "/dashboard/admin/payments", icon: CreditCard },
    { name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
}

const DashBoardSidebar = () => {
  const { data: session } = useSession()
  const pathname = usePathname()

  const sessionRole = session?.user?.role
  const role: UserRole = isUserRole(sessionRole)
    ? sessionRole
    : DEFAULT_USER_ROLE

  const dashboardUrl = `/dashboard/${role}`
  const isActive = (url: string) =>
    url === dashboardUrl
      ? pathname === url
      : pathname === url || pathname.startsWith(`${url}/`)

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroup>
          <SidebarMenu>
            {menuItemsbyRole[role].map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  render={<a href={item.url} />}
                  isActive={isActive(item.url)}
                >
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default DashBoardSidebar
