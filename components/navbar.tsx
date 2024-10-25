import { SignedIn, UserButton } from "@clerk/nextjs"
import MainNav from "@/components/MainNav"
import StoreSwitcher from "@/components/StoreSwitcher"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Store } from "@/types-db"


const Navbar = async () => {
    const { userId } = await auth()
    
    if (!userId)
    {
        redirect('/');
    }

    const storeSnap = await getDocs(
        query(collection(db, "stores"), where("userId", "==", userId))
    );

    let stores = [] as Store[];

    storeSnap.forEach(doc => {
        stores.push(doc.data() as Store)
    })

  return (
    <div className="border-b">
        <div className="flex h-16 items-center px-4">
            <StoreSwitcher items={stores} />

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