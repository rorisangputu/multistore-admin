"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import CellAction from "./CellAction";
import { CellImage } from "./cell-image";

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
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      const { images } = row.original;
      return (
        <div className="flex items-center gap-2">
          <CellImage imageUrl={images} />
        </div>
      );
    },
  },
  {
    accessorKey: "products",
    header: "Products",
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Paid
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "orderStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Status
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
