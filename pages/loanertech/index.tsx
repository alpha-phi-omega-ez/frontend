import { title } from "@/components/primitives";
import { useEffect, useState, useRef } from "react";
import Error from "@/components/error";
import { useAuth } from "@/context/AuthContext";
import { useDisclosure } from "@heroui/react";
import {
  fetchLoanerTech,
  checkLoanerTechAvailablility,
} from "@/utils/loanertech/utils";
import LoanerTech from "@/components/loanertech/loanertech";
import CheckInCheckOutModalContent from "@/components/loanertech/modals";
import LoanerTechSelector from "@/components/loanertech/selector";
import { LoanerTechType } from "@/types/loanertech";

export default function LoanerTechPage() {
  const [loanerTech, setLoanerTech] = useState<false | LoanerTechType[]>([]);
  const { auth, checkAuthStatus } = useAuth();
  const isAuthenticated = auth.isAuthenticated;
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loanerTechAvailable, setLoanerTechAvailable] = useState<boolean>(true);
  const loanerTechAvailableRef = useRef<boolean>(loanerTechAvailable);
  const [itemsCheckedOut, setItemsCheckedOut] = useState<number>(0);

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

  useEffect(() => {
    if (loanerTech) {
      const checkedOut = loanerTech.filter((item) => !item.in_office);
      setItemsCheckedOut(checkedOut.length);
    }
  }, [loanerTech]);

  return (
    <>
      <section className="justify-center pb-4 md:pb-6 text-center mb-5">
        <div className="mb-6">
          <h1 className={title()}>Loaner Tech</h1>
        </div>
        {isAuthenticated && (
          <>
            <div className="mb-4 mx-auto w-fit">
              <p
                className={
                  !loanerTechAvailable && itemsCheckedOut > 0
                    ? "rounded-lg p-2 bg-orange-500 font-bold"
                    : undefined
                }
              >
                {itemsCheckedOut} Item{itemsCheckedOut !== 1 ? "s" : ""} checked
                out
              </p>
            </div>
            <LoanerTechSelector
              selectedCards={selectedCards}
              onOpen={onOpen}
              loanerTech={loanerTech}
            />
          </>
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
