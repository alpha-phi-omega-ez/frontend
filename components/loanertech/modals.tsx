import { Dispatch, SetStateAction } from "react";
import CheckInModalContent from "./checkInModal";
import CheckOutModalContent from "./checkOutModal";
import { isCheckedOut } from "@/utils/loanertech/utils";

interface CheckInCheckOutModalContentProps {
  isOpen: boolean;
  onOpenChange: () => void;
  loanerTechAvailable: boolean;
  selectedCards: number[];
  setSelectedCards: Dispatch<SetStateAction<number[]>>;
  setLoanerTech: Dispatch<
    SetStateAction<
      | false
      | {
          description: string;
          id: number;
          in_office: boolean;
          name?: string;
          phone?: string;
          email?: string;
        }[]
    >
  >;
  loanerTech:
    | false
    | {
        description: string;
        id: number;
        in_office: boolean;
        name?: string;
        phone?: string;
        email?: string;
      }[];
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
