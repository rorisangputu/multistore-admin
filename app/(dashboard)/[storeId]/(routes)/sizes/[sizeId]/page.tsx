import { db } from "@/lib/firebase";
import { Billboards, Categories } from "@/types-db";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import CategoryForm from "./components/SizeForm";
import SizeForm from "./components/SizeForm";

const SizePage = async ({
  params,
}: {
  params: { storeId: string; sizeId: string };
}) => {
  const size = (
    await getDoc(doc(db, "stores", params.storeId, "categories", params.sizeId))
  ).data() as Categories;

  //fetching billboard data
  const billboardsData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "billboards"))
  ).docs.map((doc) => doc.data()) as Billboards[];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} billboards={billboardsData} />
      </div>
    </div>
  );
};

export default SizePage;
