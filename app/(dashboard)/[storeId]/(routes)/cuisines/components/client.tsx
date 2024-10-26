"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Columns, CuisineColumns } from "./columns";
import ApiList from "@/components/api-list";

interface KitchenClientProps {
  data: CuisineColumns[];
}

const KitchenClient = ({ data }: KitchenClientProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Kitchens (${data.length})`}
          description="Manage kitchens here"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/kitchens/create`)}
        >
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      <Separator />
      <DataTable columns={Columns} data={data} />

      <Heading title="API" description="API Calls for Kitchens" />
      <Separator />
      <ApiList entityName="kitchens" entityNameId="kitchenId" />
    </>
  );
};

export default KitchenClient;
