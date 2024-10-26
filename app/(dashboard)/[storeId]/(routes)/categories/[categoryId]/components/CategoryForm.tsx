"use client";

import Heading from "@/components/Heading";
import ImageUpload from "@/components/imageUpload";
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { storage } from "@/lib/firebase";
import { Billboards, Categories } from "@/types-db";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { deleteObject, ref } from "firebase/storage";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface CategoryFormProps {
  initialData: Categories;
  billboards: Billboards[];
}

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

const CategoryForm = ({ initialData }: CategoryFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Categories" : "Create New Category";
  const desc = initialData ? "Edit your Category" : "Add a Category";
  const toastMessage = initialData ? "Category Updated" : "Category Created!";
  const action = initialData ? "Save Changes" : "Create Category";

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    //console.log(data);

    try {
      setIsLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data);
      }
      toast.success(toastMessage);
      router.push(`/${params.storeId}/categories`);
    } catch (error) {
      toast.error("Unable to update category name");
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`
      );

      toast.success("Category removed");
      router.push(`/${params.storeId}/categories`);
    } catch (error) {
      toast.error("Unable to delete category");
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
                    <Input
                      disabled={isLoading}
                      placeholder="Category Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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

export default CategoryForm;
