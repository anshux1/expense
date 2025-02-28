import { Button } from "@/components/ui/button"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal"
import { getBudgets } from "@/db/data/budget"
import { getCategories } from "@/db/data/category"
import TransactionAddForm from "./TransactionAddForm"

export default async function TransactionAddModal() {
  const categories = await getCategories({})
  const budgets = await getBudgets()
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
          <TransactionAddForm budgets={budgets} categories={categories} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
