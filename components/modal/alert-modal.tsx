"use client"

import { useEffect, useState } from "react";
import ModalDelete from "../modalDelete";
import { Button } from "@/components/ui/button";

interface AlertModalProps{
    
    onConfirm: () => void;
    loading: boolean;
}

const AlertModal = ({
    onConfirm,
    loading
}: AlertModalProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }
  return (
    <ModalDelete title="Are you sure?" description="This action cannot be undone">
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button disabled={loading} variant={"destructive"} onClick={onConfirm}>
                Confirm
            </Button>
        </div>
    </ModalDelete>
  )
}

export default AlertModal