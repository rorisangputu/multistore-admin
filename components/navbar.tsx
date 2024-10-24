import { SignedIn, UserButton } from "@clerk/nextjs"


const Navbar = () => {
  return (
      <div className="border-b">
          <div className="flex h-16 items-center px-4">
              <p>This is store switcher</p>

              {/* Routes */}

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