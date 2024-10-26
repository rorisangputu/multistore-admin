"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Columns, SizeColumns } from "./columns";
import ApiList from "@/components/api-list";

interface SizeClientProps {
  data: SizeColumns[];
}

const SizeClient = ({ data }: SizeClientProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes here"
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/create`)}>
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      <Separator />
      <DataTable columns={Columns} data={data} />

      <Heading title="API" description="API Calls for Sizes" />
      <Separator />
      <ApiList entityName="sizes" entityNameId="sizeId" />
    </>
  );
};

export default SizeClient;
