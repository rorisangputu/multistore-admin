import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/types-db";
import { ProductColumns } from "./components/columns";
import { format } from "date-fns";

import ProductClient from "./components/client";
import { formatter } from "@/lib/utils";

const ProductIndex = async ({ params }: { params: { storeId: string } }) => {
  const productsData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "products"))
  ).docs.map((doc) => doc.data()) as Product[];

  //console.log(billboardsData);
  const formattedProducts: ProductColumns[] = productsData.map((item) => ({
    id: item.id,
    name: item.name,
    price: formatter.format(item.price),
    kitchen: item.kitchen,
    category: item.category,
    cuisine: item.cuisine,
    isArchived: item.isArchived,
    isFeatured: item.isFeatured,
    images: item.images,
    size: item.size,
    createdAt: item.createdAt
      ? format(item.createdAt.toDate(), "do MMMM, yyyy")
      : "",
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductIndex;
