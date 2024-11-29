import UnAuthorizedLoanerTech from "./unauthLoanertech";
import AuthorizedLoanerTech from "./authLoanertech";
import { useAuth } from "@/context/AuthContext";
import { Dispatch, SetStateAction } from "react";

interface LoanerTechProps {
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
  loanerTechAvailable: boolean;
  selectedCards: number[];
  setSelectedCards: Dispatch<SetStateAction<number[]>>;
}

export default function LoanerTech({
  loanerTech,
  loanerTechAvailable,
  selectedCards,
  setSelectedCards,
}: LoanerTechProps) {
  const { auth } = useAuth();

  return auth.isAuthenticated ? (
    <AuthorizedLoanerTech
      loanerTech={loanerTech}
      selectedCards={selectedCards}
      setSelectedCards={setSelectedCards}
    />
  ) : (
    <UnAuthorizedLoanerTech
      loanerTech={loanerTech}
      loanerTechAvailable={loanerTechAvailable}
    />
  );
}
