import { Typography } from "@mui/material";
import { Button } from "@nextui-org/react";
import { isCheckedOut } from "@/utils/loanertech/utils";
import { useAuth } from "@/context/AuthContext";

interface LoanerTechSelectorProps {
  selectedCards: number[];
  onOpen: () => void;
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

export default function LoanerTechSelector({
  selectedCards,
  onOpen,
  loanerTech,
}: LoanerTechSelectorProps) {
  const { auth } = useAuth();

  return (
    <>
      {auth.isAuthenticated && (
        <div className="flex items-center justify-center gap-4 mb-6">
          <Typography variant="body1">
            Selected: {selectedCards.length}
          </Typography>
          <Button
            disabled={!selectedCards.length}
            onClick={onOpen}
            style={{ width: "120px" }} // Set a fixed width
          >
            {!selectedCards.length
              ? "Select Items"
              : isCheckedOut(selectedCards, loanerTech)
              ? "Check In"
              : "Check Out"}
          </Button>
        </div>
      )}
    </>
  );
}
