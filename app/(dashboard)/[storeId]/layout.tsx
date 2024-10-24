/* eslint-disable @typescript-eslint/no-unused-vars */
import Navbar from "@/components/navbar";
import { db } from "@/lib/firebase";
import { Store } from "@/types-db";
import { auth } from "@clerk/nextjs/server"
import { collection, getDocs, query, where } from "firebase/firestore";
import { redirect } from "next/navigation";

interface DashboardLayoutProps{
    children: React.ReactNode,
    params : {storeId : string}
}


const DashboardLayout = async ({ children, params }: DashboardLayoutProps) => {
    const { userId } = await auth();
    const {storeId} = params

    if (!userId) {
        redirect("/sign-in")
    }

    const storeSnap = await getDocs(
        query(
            collection(db, "stores"),
            where("userId", "==", userId),
            where("id", "==", storeId)
        )
    )

    let store: Store | null = null;

    storeSnap.forEach((doc) => {
       store = doc.data() as Store
    });

    if (!store) {
        redirect("/");
    }

  return (
      <>
          <Navbar/>
          {children}
      </>
  )
}

export default DashboardLayout