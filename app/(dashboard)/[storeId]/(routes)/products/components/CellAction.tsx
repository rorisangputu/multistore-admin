"use client";

import { useParams, useRouter } from "next/navigation";
import { ProductColumns } from "./columns";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Copy, Edit, EllipsisVertical, Trash } from "lucide-react";
import toast from "react-hot-toast";

import axios from "axios";

interface CellActionProps {
  data: ProductColumns;
}
const CellAction = ({ data }: CellActionProps) => {
  const params = useParams();
  const router = useRouter();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Product id copied to clipboard");
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/${params.storeId}/products/${data.id}`);

      location.reload();
      router.push(`/${params.storeId}/products`);
      toast.success("Product removed");
    } catch (error) {
      toast.error("Unable to products size");
    } finally {
      location.reload();
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical className="w-5 h-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/products/${data.id}`)
            }
          >
            <Edit className="h-4 w-4 mr-2" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
