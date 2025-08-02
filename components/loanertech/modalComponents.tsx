import { ModalHeader, ModalFooter, Button } from "@heroui/react";
interface LoanerTechModalHeaderProps {
  title: string;
  selectedCards: number[];
}

export function LoanerTechModalHeader({
  title,
  selectedCards,
}: LoanerTechModalHeaderProps) {
  return (
    <ModalHeader>
      <h4 id="modal-title" className="text-2xl font-semibold">
        {title}{" "}
        {selectedCards
          .sort()
          .map((id) => `#${id}`)
          .join(", ")}
      </h4>
    </ModalHeader>
  );
}

interface LoanerTechModalFooterProps {
  onClose: () => void;
  checkIn?: () => void;
}

export function LoanerTechModalFooter({
  onClose,
  checkIn,
}: LoanerTechModalFooterProps) {
  return (
    <ModalFooter>
      <Button color="danger" onPress={onClose}>
        Cancel
      </Button>
      {checkIn ? (
        <Button color="success" onPress={checkIn}>
          Confirm
        </Button>
      ) : (
        <Button color="success" type="submit">
          Confirm
        </Button>
      )}
    </ModalFooter>
  );
}
