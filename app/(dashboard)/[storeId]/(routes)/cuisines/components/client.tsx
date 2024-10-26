"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Columns, CuisineColumns } from "./columns";
import ApiList from "@/components/api-list";

interface CuisineClientProps {
  data: CuisineColumns[];
}

const CuisineClient = ({ data }: CuisineClientProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Cuisines (${data.length})`}
          description="Manage cuisines here"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/cuisines/create`)}
        >
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      <Separator />
      <DataTable columns={Columns} data={data} />

      <Heading title="API" description="API Calls for Cuisines" />
      <Separator />
      <ApiList entityName="cuisines" entityNameId="cuisineId" />
    </>
  );
};

export default CuisineClient;
