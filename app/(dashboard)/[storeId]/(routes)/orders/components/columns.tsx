"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import CellAction from "./CellAction";

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
  {
    accessorKey: "orderItem",
    header: "Item",
  },
  {
    accessorKey: "phone",
    header: "Contacts",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "orderStatus",
    header: "Status",
  },
  {
    accessorKey: "isPaid",
    header: "Payment",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    header: "Actions",
    id: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
