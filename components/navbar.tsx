import { SignedIn, UserButton } from "@clerk/nextjs"
import MainNav from "@/components/MainNav"
import StoreSwitcher from "@/components/StoreSwitcher"


const Navbar = () => {
  return (
      <div className="border-b">
          <div className="flex h-16 items-center px-4">
              <StoreSwitcher items={[]} />

              {/* Routes */}
              <MainNav/>

              {/* User profile */}
            <div className="ml-auto">
                <SignedIn>
                    <UserButton  afterSwitchSessionUrl="/"/>
                </SignedIn>
            </div>
          </div>
    </div>
  )
}

export default Navbar