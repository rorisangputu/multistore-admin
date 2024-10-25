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
    children? : React.ReactNode
}

const ModalDelete = ({ title, description, children }: ModalProps) => {
    
  return (
    <Dialog>
      <DialogTrigger className="text-sm">Delete</DialogTrigger>
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

export default ModalDelete