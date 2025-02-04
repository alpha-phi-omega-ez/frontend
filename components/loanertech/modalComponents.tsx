import { ModalHeader, ModalFooter, Button } from "@heroui/react";
import { Typography } from "@mui/material";

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
      <Typography id="modal-title" variant="h6">
        {title}{" "}
        {selectedCards
          .sort()
          .map((id) => `#${id}`)
          .join(", ")}
      </Typography>
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
