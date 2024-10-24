"use client"

import { PopoverTrigger } from "@/components/ui/popover"
import { Store } from "@/types-db";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps{
    items: Store[]
}

const StoreSwitcher = ({items}: StoreSwitcherProps) => {
  return (
    <div>StoreSwitcher</div>
  )
}

export default StoreSwitcher