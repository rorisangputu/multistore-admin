"use client"

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Store } from "@/types-db"
import { Trash } from "lucide-react"

interface SettinsgFormProps{
    initialData : Store
}

const SettingsForm = ({initialData} : SettinsgFormProps) => {
  return (
    <>
        <div className="flex items-center justify-center">
              <Heading title="Settings" description="Manage Store preferences" />
              <Button variant={"destructive"} size={"icon"} onClick={() => {}}>
                  <Trash className="h-4 w-4"/>
              </Button>
        </div>
    </>
  )
}

export default SettingsForm