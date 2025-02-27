"use client"

import { Button } from "@/components/ui/button"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal"
import BudgetAddForm from "./BudgetAddForm"

export default function BudgetAddModal() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="secondary">
          Create <span className="hidden sm:block">Budget</span>
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle className="w-full text-center text-lg font-semibold">
            Create New Budget
          </ModalTitle>
        </ModalHeader>
        <ModalBody className="mx-auto w-full space-y-6 pb-4 text-center sm:pb-0 sm:text-left">
          <BudgetAddForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
