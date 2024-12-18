"use client";

import { ColumnDef } from "@tanstack/react-table";
//import { Button } from "@/components/ui/button";
//import { ArrowUpDown } from "lucide-react";
import CellAction from "./CellAction";
import { cn } from "@/lib/utils";
//import { CellImage } from "./cell-image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumns = {
  id: string;
  phone: string;
  address: string;
  products: string;
  totalPrice: string;
  images: string[];
  isPaid: boolean;
  orderStatus: string;
  createdAt: string;
};

export const Columns: ColumnDef<OrderColumns>[] = [
  // {
  //   accessorKey: "images",
  //   header: "Image",
  //   cell: ({ row }) => {
  //     const { images } = row.original;
  //     return (
  //       <div className="grid grid-cols-2 gap-2">
  //         <CellImage imageUrl={images} />
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "products",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Contacts",
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
  },
  {
    accessorKey: "isPaid",
    header: "Payment",
    cell: ({ row }) => {
      const { isPaid } = row.original;

      return (
        <p
          className={cn(
            "text-md font-semibold",
            isPaid ? "text-emerald-600" : "text-red-600"
          )}
        >
          {isPaid ? "Paid" : "Not Paid"}
        </p>
      );
    },
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
  },

  {
    header: "Actions",
    id: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
