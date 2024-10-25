"use client"

import Heading from "@/components/Heading"
import { Store } from "@/types-db"

interface SettinsgFormProps{
    initialData : Store
}

const SettingsForm = ({initialData} : SettinsgFormProps) => {
  return (
    <>
        <div className="flex items-center justify-center">
            <Heading title="Settings" description="Manage Store preferences" />
        </div>
    </>
  )
}

export default SettingsForm