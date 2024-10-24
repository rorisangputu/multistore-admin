import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

interface DashboardLayoutProps{
    children: React.ReactNode,
    params : {storeId : string}
}


const DashboardLayout = async ({ children, params }: DashboardLayoutProps) => {
    const { userId } = await auth();
    
    if (!userId) {
        redirect("/sign-in")
    }
  return (
      <div>
          
    </div>
  )
}

export default DashboardLayout