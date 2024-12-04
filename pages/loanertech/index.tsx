import { title } from "@/components/primitives";
import { useEffect, useState } from "react";
import Error from "@/components/error";
import { useAuth } from "@/context/AuthContext";
import { useDisclosure } from "@nextui-org/react";
import {
  fetchLoanerTech,
  checkLoanerTechAvailablility,
} from "@/utils/loanertech/utils";
import LoanerTech from "@/components/loanertech/loanertech";
import CheckInCheckOutModalContent from "@/components/loanertech/modals";
import LoanerTechSelector from "@/components/loanertech/selector";

export default function LoanerTechPage() {
  const [loanerTech, setLoanerTech] = useState<
    | false
    | {
        description: string;
        id: number;
        in_office: boolean;
        name?: string;
        phone?: string;
        email?: string;
      }[]
  >([]);
  const { logout } = useAuth();
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loanerTechAvailable, setLoanerTechAvailable] = useState(true);

  useEffect(() => {
    fetchLoanerTech(setLoanerTech, logout);
    checkLoanerTechAvailablility(setLoanerTechAvailable);

    const intervalId = setInterval(() => {
      fetchLoanerTech(setLoanerTech, logout);
      checkLoanerTechAvailablility(setLoanerTechAvailable);
    }, 5000); // Fetch every 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <section className="justify-center pb-4 md:pb-6 text-center">
        <div className="mb-10">
          <h1 className={title()}>Loaner Tech</h1>
        </div>
        <LoanerTechSelector
          selectedCards={selectedCards}
          onOpen={onOpen}
          loanerTech={loanerTech}
        />
        <LoanerTech
          loanerTech={loanerTech}
          loanerTechAvailable={loanerTechAvailable}
          selectedCards={selectedCards}
          setSelectedCards={setSelectedCards}
        />
      </section>
      <CheckInCheckOutModalContent
        loanerTechAvailable={loanerTechAvailable}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        setSelectedCards={setSelectedCards}
        selectedCards={selectedCards}
        setLoanerTech={setLoanerTech}
        loanerTech={loanerTech}
      />
      {loanerTech && !loanerTech.length && (
        <Error title="Error Loading Loanertech Data" />
      )}
    </>
  );
}
