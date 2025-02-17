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
import TransactionAddForm from "./TransactionAddForm"

export default function TransactionAddModal() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="secondary">
          Add <span className="hidden sm:block">transaction</span>
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle className="w-full text-center text-lg font-semibold">
            New Transaction
          </ModalTitle>
        </ModalHeader>
        <ModalBody className="mx-auto space-y-6 pb-4 text-center sm:pb-0 sm:text-left">
          <TransactionAddForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
