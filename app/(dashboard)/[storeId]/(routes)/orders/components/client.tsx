"use client";

import Heading from "@/components/Heading";

import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import { useParams, useRouter } from "next/navigation";
import { Columns, OrderColumns } from "./columns";

interface OrderClientProps {
  data: OrderColumns[];
}

const OrderClient = ({ data }: OrderClientProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${data.length})`}
          description="Manage orders here"
        />
      </div>

      <Separator />
      <DataTable columns={Columns} data={data} />
    </>
  );
};

export default OrderClient;
