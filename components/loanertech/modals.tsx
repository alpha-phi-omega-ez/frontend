import { Dispatch, SetStateAction } from "react";
import CheckInModalContent from "./checkInModal";
import CheckOutModalContent from "./checkOutModal";
import { isCheckedOut } from "@/utils/loanertech";
import { LoanerTechType } from "@/types/loanertech";

interface CheckInCheckOutModalContentProps {
  isOpen: boolean;
  onOpenChange: () => void;
  loanerTechAvailable: boolean;
  selectedCards: number[];
  setSelectedCards: Dispatch<SetStateAction<number[]>>;
  setLoanerTech: Dispatch<SetStateAction<false | LoanerTechType[]>>;
  loanerTech: false | LoanerTechType[];
}

export default function CheckInCheckOutModalContent({
  loanerTechAvailable,
  isOpen,
  onOpenChange,
  setSelectedCards,
  selectedCards,
  setLoanerTech,
  loanerTech,
}: CheckInCheckOutModalContentProps) {
  return isCheckedOut(selectedCards, loanerTech) ? (
    <CheckInModalContent
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      selectedCards={selectedCards}
      setSelectedCards={setSelectedCards}
      setLoanerTech={setLoanerTech}
    />
  ) : (
    <CheckOutModalContent
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      loanerTechAvailable={loanerTechAvailable}
      selectedCards={selectedCards}
      setSelectedCards={setSelectedCards}
      setLoanerTech={setLoanerTech}
    />
  );
}
