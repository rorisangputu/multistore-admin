import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Categories } from "@/types-db";
import { CategoryColumns } from "./components/columns";
import { format } from "date-fns";
import CategoryClient from "./components/client";

const CategoriesIndex = async ({ params }: { params: { storeId: string } }) => {
  const categoriesData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "categories"))
  ).docs.map((doc) => doc.data()) as Categories[];

  //console.log(billboardsData);
  const formattedCategories: CategoryColumns[] = categoriesData.map((item) => ({
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
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesIndex;
