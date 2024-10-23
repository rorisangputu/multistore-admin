"use client"
import Modal from "@/components/modal"


const setupPage = () => {
  return (
    <div>
      <Modal
        title="Create your store"
        description="Open a new store now."
        isOpen
        onClose={() => { }}>
        This is the store modal
      </Modal>
    </div>
  )
}

export default setupPage
