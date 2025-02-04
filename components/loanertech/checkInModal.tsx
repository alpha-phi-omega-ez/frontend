import { Modal, ModalBody, ModalContent } from "@heroui/react";
import { Typography } from "@mui/material";
import { fetchLoanerTech } from "@/utils/loanertech/utils";
import {
  LoanerTechModalFooter,
  LoanerTechModalHeader,
} from "./modalComponents";
import { Dispatch, SetStateAction } from "react";
import { useAlert } from "@/context/AlertContext";
import { LoanerTechType } from "@/types/loanertech";

interface CheckInModalContentProps {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedCards: number[];
  setSelectedCards: Dispatch<SetStateAction<number[]>>;
  setLoanerTech: Dispatch<SetStateAction<false | LoanerTechType[]>>;
}

export default function CheckInModalContent({
  isOpen,
  onOpenChange,
  selectedCards,
  setSelectedCards,
  setLoanerTech,
}: CheckInModalContentProps) {
  const { newAlert } = useAlert();

  const checkIn = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/loanertech/checkin`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: selectedCards,
          }),
        }
      );

      if (response.ok) {
        fetchLoanerTech(setLoanerTech); // Refresh data
        setSelectedCards([]);
        onOpenChange(); // Close modal after submission
      }
    } catch (error) {
      console.error("Checkin operation failed:", error);
      newAlert("Failed to check in loanertech items", "danger");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="xl"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <LoanerTechModalHeader
              title="Check In"
              selectedCards={selectedCards}
            />
            <ModalBody>
              <Typography variant="body1">
                Are you sure you want to check in the selected items?
              </Typography>
            </ModalBody>
            <LoanerTechModalFooter onClose={onClose} checkIn={checkIn} />
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
