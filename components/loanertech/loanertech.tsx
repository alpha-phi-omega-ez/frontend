import UnAuthorizedLoanerTech from "./unauthLoanertech";
import AuthorizedLoanerTech from "./authLoanertech";
import { useAuth } from "@/context/AuthContext";
import { Dispatch, SetStateAction } from "react";
import { LoanerTechType } from "@/types/loanertech";

interface LoanerTechProps {
  loanerTech: false | LoanerTechType[];
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
