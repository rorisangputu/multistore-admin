/* eslint-disable @typescript-eslint/no-unused-vars */
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

    if (!userId) {
        redirect("/sign-in")
    }

    const storeSnap = await getDocs(
        query(
            collection(db, "stores"),
            where("userId", "==", userId),
            where("id", "==", params.storeId)
        )
    )

    let store;

    storeSnap.forEach((doc) => {
       store = doc.data() as Store
    });

    if (!store) {
        redirect("/");
    }

  return (
      <>
          <h1>This is the Nav: {params.storeId}</h1>
          {children}
      </>
  )
}

export default DashboardLayout