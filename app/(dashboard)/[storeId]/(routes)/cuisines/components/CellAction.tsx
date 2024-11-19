"use client";

import { useParams, useRouter } from "next/navigation";
import { CuisineColumns } from "./columns";
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
  data: CuisineColumns;
}
const CellAction = ({ data }: CellActionProps) => {
  const params = useParams();
  const router = useRouter();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Size id copied to clipboard");
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/${params.storeId}/cuisines/${data.id}`);

      location.reload();
      router.push(`/${params.storeId}/cuisines`);
      toast.success("Cuisine removed");
    } catch (error) {
      toast.error("Unable to delete cuisine");
      console.log(error);
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
              router.push(`/${params.storeId}/cuisines/${data.id}`)
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
