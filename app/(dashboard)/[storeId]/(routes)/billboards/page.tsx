import { collection, doc, getDocs } from "firebase/firestore";
import BillboardClient from "./components/client";
import { db } from "@/lib/firebase";
import { Billboards } from "@/types-db";

const BillboardsIndex = async ({ params }: { params: { storeId: string } }) => {
  const billboardsData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "billboards"))
  ).docs.map((doc) => doc.data()) as Billboards[];

  //console.log(billboardsData);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={billboardsData} />
      </div>
    </div>
  );
};

export default BillboardsIndex;
