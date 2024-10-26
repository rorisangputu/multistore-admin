import { db } from "@/lib/firebase";
import { Categories, Cuisines, Kitchen, Product, Sizes } from "@/types-db";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import ProductForm from "./components/ProductForm";

const ProductPage = async ({
  params,
}: {
  params: { storeId: string; productId: string };
}) => {
  const product = (
    await getDoc(
      doc(db, "stores", params.storeId, "products", params.productId)
    )
  ).data() as Product;

  const categories = (
    await getDocs(collection(doc(db, "stores", params.storeId), "categories"))
  ).docs.map((doc) => doc.data()) as Categories[];
  const kitchens = (
    await getDocs(collection(doc(db, "stores", params.storeId), "kitchens"))
  ).docs.map((doc) => doc.data()) as Kitchen[];
  const sizes = (
    await getDocs(collection(doc(db, "stores", params.storeId), "sizes"))
  ).docs.map((doc) => doc.data()) as Sizes[];
  const cuisines = (
    await getDocs(collection(doc(db, "stores", params.storeId), "cuisines"))
  ).docs.map((doc) => doc.data()) as Cuisines[];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          categories={categories}
          kitchens={kitchens}
          sizes={sizes}
          cuisines={cuisines}
        />
      </div>
    </div>
  );
};

export default ProductPage;
