/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useParams, useRouter } from "next/navigation";
import { OrderColumns } from "./columns";
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
  data: OrderColumns;
}
const CellAction = ({ data }: CellActionProps) => {
  const params = useParams();
  const router = useRouter();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Order id copied to clipboard");
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/${params.storeId}/orders/${data.id}`);

      location.reload();
      router.push(`/${params.storeId}/orders`);
      toast.success("Order removed");
    } catch (error) {
      toast.error("Unable to delete order");
    } finally {
      location.reload();
    }
  };

  const onUpdate = async (data: any) => {
    try {
      await axios.patch(`/api/${params.storeId}/orders/${data.id}`, data);
      location.reload();
      router.push(`/${params.storeId}/orders`);
      toast.success("Orders updated");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      router.refresh();
    }
  };
  const onDelivered = async (data: any) => {
    try {
      await axios.patch(`/api/${params.storeId}/orders/${data.id}`, data);
      location.reload();
      router.push(`/${params.storeId}/orders`);
      toast.success("Orders updated");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      router.refresh();
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
              onUpdate({ id: data.id, order_status: "Delivering" })
            }
          >
            <Edit className="h-4 w-4 mr-2" />
            Delivering
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              onDelivered({ id: data.id, order_status: "Delivered" })
            }
          >
            <Edit className="h-4 w-4 mr-2" />
            Delivered
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
