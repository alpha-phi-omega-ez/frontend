import { Button } from "@nextui-org/react";
import { isCheckedOut } from "@/utils/loanertech/utils";
import { LoanerTechType } from "@/types/loanertech";

interface LoanerTechSelectorProps {
  selectedCards: number[];
  onOpen: () => void;
  loanerTech: false | LoanerTechType[];
}

export default function LoanerTechSelector({
  selectedCards,
  onOpen,
  loanerTech,
}: LoanerTechSelectorProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      <p>
        {selectedCards.length} Item{selectedCards.length !== 1 ? "s" : ""}{" "}
        Selected
      </p>
      <Button
        isDisabled={selectedCards.length === 0}
        onPress={onOpen}
        style={{ width: "120px" }} // Set a fixed width
      >
        {!selectedCards.length
          ? "Select Items"
          : isCheckedOut(selectedCards, loanerTech)
          ? "Check In"
          : "Check Out"}
      </Button>
    </div>
  );
}
