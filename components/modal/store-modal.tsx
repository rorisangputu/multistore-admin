"use client"

import Modal from "@/components/modal"
import { useStoreModal } from "@/hooks/use-store-modal"



export const StoreModal = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const storeModal = useStoreModal()
    return (
        <Modal
        title="Create a new store"
        description="Open a new store now."
        isOpen = {storeModal.isOpen}
        onClose={storeModal.onClose}>
        This is the store modal
      </Modal>
    )
}