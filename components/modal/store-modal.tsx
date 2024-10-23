/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Modal from "@/components/modal"
import { useStoreModal } from "@/hooks/use-store-modal"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    name: z.string().min(2, {message: "Store name should be minimum 2 characters"})
})

export const StoreModal = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const storeModal = useStoreModal()

    const [isLoading, seIsLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    return (
        <Modal
            title="Create a new store"
            description="Open a new store now."
            isOpen = {storeModal.isOpen}
            onClose={storeModal.onClose}>
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button disabled={isLoading} type="submit">Create</Button>
                            </div>
                        </form>
                    </Form>
                </div>
                
            </div>
      </Modal>
    )
}