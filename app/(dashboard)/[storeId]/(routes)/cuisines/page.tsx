import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Kitchen } from "@/types-db";
import { KitchenColumns } from "./components/columns";
import { format } from "date-fns";
import KitchenClient from "./components/client";

const KitchenIndex = async ({ params }: { params: { storeId: string } }) => {
  const kitchenData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "kitchens"))
  ).docs.map((doc) => doc.data()) as Kitchen[];

  //console.log(billboardsData);
  const formattedKitchens: KitchenColumns[] = kitchenData.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: item.createdAt
      ? format(item.createdAt.toDate(), "do MMMM, yyyy")
      : "",
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <KitchenClient data={formattedKitchens} />
      </div>
    </div>
  );
};

export default KitchenIndex;
