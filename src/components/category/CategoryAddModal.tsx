"use client"

import { TransactionType } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal"
import { CategoryAddForm } from "./CategoryAddForm"

export default function CategoryAddModal({ type }: { type: TransactionType }) {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button className="mb-2" variant="outline">
          Add
        </Button>
      </ModalTrigger>
      <ModalContent className="top-1/2 md:max-w-[400px]">
        <ModalHeader>
          <ModalTitle className="w-full text-center text-lg font-semibold">
            New {type} Category
          </ModalTitle>
        </ModalHeader>
        <ModalBody className="mx-auto w-full max-w-md pb-4 text-center sm:text-left">
          <CategoryAddForm type={type} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
