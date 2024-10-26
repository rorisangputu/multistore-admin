"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Columns, ProductColumns } from "./columns";
import ApiList from "@/components/api-list";

interface ProductClientProps {
  data: ProductColumns[];
}

const ProductClient = ({ data }: ProductClientProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products here"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/products/create`)}
        >
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      <Separator />
      <DataTable columns={Columns} data={data} />

      <Heading title="API" description="API Calls for Products" />
      <Separator />
      <ApiList entityName="products" entityNameId="productId" />
    </>
  );
};

export default ProductClient;
