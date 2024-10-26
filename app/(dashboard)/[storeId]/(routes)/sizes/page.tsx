import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Categories } from "@/types-db";
import { SizeColumns } from "./components/columns";
import { format } from "date-fns";
import SizeClient from "./components/client";

const SizeIndex = async ({ params }: { params: { storeId: string } }) => {
  const sizesData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "sizes"))
  ).docs.map((doc) => doc.data()) as Categories[];

  //console.log(billboardsData);
  const formattedSizes: SizeColumns[] = sizesData.map((item) => ({
    id: item.id,
    name: item.name,
    billboardId: item.billboardId,
    billboardLabel: item.billboardLabel,
    createdAt: item.createdAt
      ? format(item.createdAt.toDate(), "do MMMM, yyyy")
      : "",
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizeIndex;
