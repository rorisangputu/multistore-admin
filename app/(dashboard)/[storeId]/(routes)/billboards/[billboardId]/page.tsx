import { db } from "@/lib/firebase"
import { Billboards } from "@/types-db"
import { doc, getDoc } from "firebase/firestore"


const BillboardPage = async ({ params }: { params: { storeId: string, billboardId: string } }) => {
    
    const billboard = (
        await getDoc(doc(db, "stores", params.storeId, "billboards", params.billboardId))
    ).data() as Billboards;

    
  return (
    <div>BillboardPage</div>
  )
}

export default BillboardPage