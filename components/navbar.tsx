import { SignedIn, UserButton } from "@clerk/nextjs"
import MainNav from "./MainNav"


const Navbar = () => {
  return (
      <div className="border-b">
          <div className="flex h-16 items-center px-4">
              <p>This is store switcher</p>

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