"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


interface ModalProps{
    title: string,
    description: string,
    isOpen: boolean,
    onClose: () => void,
    children? : React.ReactNode
}

const Modal = ({ title, description, children }: ModalProps) => {
    
  return (
        <Dialog>
            <DialogTrigger className="text-sm">Create Store</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
  )
}

export default Modal