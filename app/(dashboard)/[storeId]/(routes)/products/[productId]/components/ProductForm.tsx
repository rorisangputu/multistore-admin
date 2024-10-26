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

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Categories, Cuisines, Kitchen, Product, Sizes } from "@/types-db";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface ProductFormProps {
  initialData: Product;
  categories: Categories[];
  sizes: Sizes[];
  kitchens: Kitchen[];
  cuisines: Cuisines[];
}

const formSchema = z.object({
  name: z.string().min(1),
  kitchen: z.string().min(1),
  cuisine: z.string().min(1),
  size: z.string().min(1),
  category: z.string().min(1),
  price: z.coerce.number().min(1),
  images: z.object({ url: z.string() }).array(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

const ProductForm = ({
  initialData,
  categories,
  sizes,
  kitchens,
  cuisines,
}: ProductFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Product" : "Create New Product";
  const desc = initialData ? "Edit your Product" : "Add a Product";
  const toastMessage = initialData ? "Product Updated" : "Product Created!";
  const action = initialData ? "Save Changes" : "Create Product";

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);

    try {
      setIsLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      }
      toast.success(toastMessage);
      router.push(`/${params.storeId}/products`);
    } catch (error) {
      toast.error("Error handling products name");
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${params.sizeId}`);

      toast.success("Product removed");
      router.push(`/${params.storeId}/products`);
    } catch (error) {
      toast.error("Unable to delete product");
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
            {/* Product Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Product"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isLoading}
                      placeholder="0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Category */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Kitchen */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kitchen</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Kitchens" />
                      </SelectTrigger>
                      <SelectContent>
                        {kitchens.map((kitchen) => (
                          <SelectItem key={kitchen.id} value={kitchen.id}>
                            {kitchen.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Cuisine */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuisine</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Cuisines" />
                      </SelectTrigger>
                      <SelectContent>
                        {cuisines.map((cuisine) => (
                          <SelectItem key={cuisine.id} value={cuisine.id}>
                            {cuisine.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Size */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Size" />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size.id} value={size.id}>
                            {size.name}
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

export default ProductForm;
