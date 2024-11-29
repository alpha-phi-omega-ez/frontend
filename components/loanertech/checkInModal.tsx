import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { Typography } from "@mui/material";
import { fetchLoanerTech } from "@/utils/loanertech/utils";
import {
  LoanerTechModalFooter,
  LoanerTechModalHeader,
} from "./modalComponents";
import { Dispatch, SetStateAction } from "react";
import { useAuth } from "@/context/AuthContext";

interface CheckInModalContentProps {
  isOpen: boolean;
  onOpenChange: () => void;
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
}

export default function CheckInModalContent({
  isOpen,
  onOpenChange,
  selectedCards,
  setSelectedCards,
  setLoanerTech,
}: CheckInModalContentProps) {
  const { logout } = useAuth();

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
        fetchLoanerTech(setLoanerTech, logout); // Refresh data
        setSelectedCards([]);
        onOpenChange(); // Close modal after submission
      }
    } catch (error) {
      console.error("Checkin operation failed:", error);
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
