"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Store } from "@/types-db";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, StoreIcon } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps{
    items: Store[]
}

const StoreSwitcher = ({ items }: StoreSwitcherProps) => {
    
    const params = useParams();
    const router = useRouter();

    const formattedStores = items.map((items) => ({
        label: items.name,
        value: items.id,
    }));

    const currentStore = formattedStores.find(
        (item) => item.value === params.storeId
    );

    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [filtered, setFiltered] = useState<{label :string, value: string}[]>([])

    const onStoreSelect = (store: { value: string, label: string }) => {
        setOpen(false)
        router.push(`${store.value}`)
    }

    const handleSearchTerm = (e: any) => {
        setSearchTerm(e.target.value)
        setFiltered(
            formattedStores.filter(item => item.label.toLowerCase().includes(searchTerm.toLowerCase()))
        )
    };

  return (
   <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
              >
                  <StoreIcon className="mr-2 h-4 w-4"/>
          {currentStore?.value
            ? formattedStores.find((store) => store.value === currentStore?.value)?.label
            : "Select store"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
            <div className="w-full px-2 py-1 flex items-center border rounded-md border-gray-100">
                <StoreIcon className="mr-2 h-4 w-4 min-w-4" />
                <input
                    type="text"
                    placeholder="Search Store.."
                    onChange={handleSearchTerm}
                    className="flex-1 w-full outline-none"
                />                   
            </div>
          <CommandList>
            <CommandEmpty>No Stores found.</CommandEmpty>
            <CommandGroup heading="Stores">
             {
                searchTerm === "" ? (
                    formattedStores.map(item => (
                       <li></li> 
                    ))
                ) :
                (<></>)
             }
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>

  )
}

export default StoreSwitcher