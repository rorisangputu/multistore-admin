/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Modal from "@/components/modal"
import { useStoreModal } from "@/hooks/use-store-modal"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { Form } from "@/components/ui/form";

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

                        </form>
                    </Form>
                </div>
            </div>
      </Modal>
    )
}