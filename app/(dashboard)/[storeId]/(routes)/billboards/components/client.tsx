"use client"

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation"



const BillboardClient = () => {
    const params = useParams();
    const router = useRouter();

  return (
      <div className="flex items-center justify-between">
          <Heading title="Billboards (0)" description="Manage billboards for your store" />  
          <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
              <Plus className="h-4 w-4" />
              Add New
          </Button>
    </div>
  )
}

export default BillboardClient