"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumns = {
  id: string;
  name: string;
  createdAt: string;
};

export const Columns: ColumnDef<CategoryColumns>[] = [
  {
    accessorKey: "name",
    header: "Category",
  },

  {
    header: "Actions",
    id: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
