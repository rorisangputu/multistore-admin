"use client"

import Heading from "@/components/Heading"
import AlertModal from "@/components/modal/alert-modal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Store } from "@/types-db"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

interface SettinsgFormProps{
    initialData : Store
}

const formSchema = z.object({
    name: z
        .string()
        .min(3, {message: "Name should be min 3 characters"})
})

const SettingsForm = ({ initialData }: SettinsgFormProps) => {
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const params = useParams();
    const router = useRouter();

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        //console.log(data);

        try {
            setIsLoading(true);
            const response = await axios.patch(`/api/stores/${params.storeId}`, data);
            toast.success("Store name updated");
            router.refresh();
        } catch (error) {
            toast.error("Unable to update store name")
        } finally {
            setIsLoading(false);
        }
    }
    const onDelete = async () => {
        

        try {
            setIsLoading(true);
            const response = await axios.delete(`/api/stores/${params.storeId}`);
            
            if (response) {
                toast.success("Store removed");
            router.refresh();
            router.push("/");
            }
        } catch (error) {
            toast.error("Unable to delete store")
        } finally {
            setIsLoading(false);
        }
    }


  return (
    <>  
        
        <div className="flex items-center justify-center">
            <Heading title="Settings" description="Manage Store preferences" />
            <div className="bg-red-600 flex items-center px-5 gap-2 text-white py-2 ">
                <Trash className="h-4 w-4 text-white" />
                <AlertModal onConfirm={onDelete} loading={isLoading} />
            </div>
        </div>
        <Separator />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                <div className="grid grid-cols-3 gap-8">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isLoading}
                                    placeholder="Store name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} />      
                </div>
                <Button disabled={isLoading} type="submit">Save Changes</Button>
            </form>
        </Form>
    </>
  )
}

export default SettingsForm