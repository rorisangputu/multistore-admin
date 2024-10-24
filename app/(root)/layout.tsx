import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

interface SetupLayoutProps{
    children: React.ReactNode
}

const SetupLayout = async ({ children }: SetupLayoutProps) => {
  
  const { userId } = await auth();

  if (!userId) {
        redirect("/sign-in")
    }


  return (
    <div>
         {children} 
    </div>
  )
}

export default SetupLayout