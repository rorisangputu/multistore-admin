import { db } from "@/lib/firebase"
import { Billboards } from "@/types-db"
import { doc, getDoc } from "firebase/firestore"
import BillboardForm from "./components/BillboardForm";

interface BillboardPageProps {
  params: {
    storeId: string;
    billboardId: string;
  };
}

const BillboardPage = async ({ params }: BillboardPageProps) => {
  const billboard = (
    await getDoc(
      doc(db, "stores", params.storeId, "billboards", params.billboardId)
    )
  ).data() as Billboards;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage
 