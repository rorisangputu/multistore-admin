"use client";

import Heading from "@/components/Heading";
import AlertModal from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Billboards, Categories } from "@/types-db";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface SizeFormProps {
  initialData: Categories;
  billboards: Billboards[];
}

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

const SizeForm = ({ initialData, billboards }: SizeFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Size" : "Create New Size";
  const desc = initialData ? "Edit your Size" : "Add a Size";
  const toastMessage = initialData ? "Size Updated" : "Size Created!";
  const action = initialData ? "Save Changes" : "Create Size";

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    //console.log(data);

    try {
      setIsLoading(true);

      const { billboardId: formBillId } = form.getValues();
      const matchingBillboardIds = billboards.find(
        (item) => item.id === formBillId
      );

      if (initialData) {
        await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, {
          ...data,
          billboardLabel: matchingBillboardIds?.label,
        });
      } else {
        await axios.post(`/api/${params.storeId}/sizes`, {
          ...data,
          billboardLabel: matchingBillboardIds?.label,
        });
      }
      toast.success(toastMessage);
      router.push(`/${params.storeId}/sizes`);
    } catch (error) {
      toast.error("Error handling sizes name");
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);

      toast.success("Size removed");
      router.push(`/${params.storeId}/sizes`);
    } catch (error) {
      toast.error("Unable to delete size");
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <Heading title={title} description={desc} />
        {initialData ? (
          <div className="bg-red-600 flex items-center px-5 gap-2 text-white py-2 ">
            <Trash className="h-4 w-4 text-white" />
            <AlertModal onConfirm={onDelete} loading={isLoading} />
          </div>
        ) : (
          ""
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Size" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Billboards" />
                      </SelectTrigger>
                      <SelectContent>
                        {billboards.map((billboard) => (
                          <SelectItem key={billboard.id} value={billboard.id}>
                            {billboard.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SizeForm;