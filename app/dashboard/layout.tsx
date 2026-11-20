import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashBoardSidebar from "../components/DashBoardSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
   return (
    <SidebarProvider>
      <DashBoardSidebar />
      <main className="min-w-0 flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
};

export default DashboardLayout;




