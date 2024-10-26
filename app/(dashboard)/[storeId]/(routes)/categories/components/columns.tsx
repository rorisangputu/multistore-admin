"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import CellAction from "./CellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumns = {
  id: string;
  billboardLabel: string;
  name: string;
  createdAt: string;
};

export const Columns: ColumnDef<CategoryColumns>[] = [
  {
    accessorKey: "name",
    header: "Category",
  },
  {
    accessorKey: "billboardLabel",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Billboard Name
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
