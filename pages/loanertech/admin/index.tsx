import { title } from "@/components/primitives";
import { Button, useDisclosure } from "@heroui/react";
import { CreateLoanerTechModal } from "@/components/loanertech/createLoanertech";

export default function LoanerTechAdminPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  return (
    <>
    <section className="justify-center pb-4 md:pb-6 text-center mb-5">
      <div className="mb-6">
        <h1 className={title()}>Loaner Tech Admin</h1>
      </div>
      <Button onPress={onOpen} color="primary">Add Loaner Tech</Button>
    </section>
    <CreateLoanerTechModal 
    isOpen={isOpen}
        onOpenChange={onOpenChange}/>
  </>
  );
}