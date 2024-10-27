import { db } from "@/lib/firebase";
import { Sizes } from "@/types-db";
import { doc, getDoc } from "firebase/firestore";
import SizeForm from "./components/SizeForm";

const SizePage = async ({
  params,
}: {
  params: { storeId: string; sizeId: string };
}) => {
  const size = (
    await getDoc(doc(db, "stores", params.storeId, "sizes", params.sizeId))
  ).data() as Sizes;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
