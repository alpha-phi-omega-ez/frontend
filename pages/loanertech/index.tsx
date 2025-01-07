import { title } from "@/components/primitives";
import { useEffect, useState, useRef } from "react";
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
  const { auth, checkAuthStatus } = useAuth();
  const isAuthenticated = auth.isAuthenticated;
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loanerTechAvailable, setLoanerTechAvailable] = useState<boolean>(true);
  const loanerTechAvailableRef = useRef<boolean>(loanerTechAvailable);

  useEffect(() => {
    checkAuthStatus();
    fetchLoanerTech(setLoanerTech);
    checkLoanerTechAvailablility(setLoanerTechAvailable);

    const intervalId = setInterval(() => {
      if (
        isAuthenticated ||
        (!isAuthenticated && loanerTechAvailableRef.current)
      ) {
        checkAuthStatus();
        fetchLoanerTech(setLoanerTech);
        checkLoanerTechAvailablility(setLoanerTechAvailable);
      }
    }, 5000); // Fetch every 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <section className="justify-center pb-4 md:pb-6 text-center mb-5">
        <div className="mb-10">
          <h1 className={title()}>Loaner Tech</h1>
        </div>
        {isAuthenticated && (
          <LoanerTechSelector
            selectedCards={selectedCards}
            onOpen={onOpen}
            loanerTech={loanerTech}
          />
        )}
        {!isAuthenticated && (
          <p className="w-2/3 mx-auto text-center mb-8">
            APO offers calculators and chargers at no cost to be borrowed during
            the hours of 10 am and 4 pm. You can pick up items at the APO office
            in Union room 3420 and return them by 4 pm the same day.
          </p>
        )}
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
