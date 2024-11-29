import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useEffect, useState } from "react";
import Error from "@/components/error";
import { useAuth } from "@/context/AuthContext";
import { useDisclosure } from "@nextui-org/react";
import { fetchLoanerTech, isCheckedOut } from "@/utils/loanertech/utils";
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

  useEffect(() => {
    fetchLoanerTech(setLoanerTech, logout);

    const intervalId = setInterval(() => {
      fetchLoanerTech(setLoanerTech, logout);
    }, 5000); // Fetch every 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const estNow = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
  );
  const loanerTechAvailable =
    estNow.getDay() >= 1 &&
    estNow.getDay() <= 5 &&
    estNow.getHours() >= 9 &&
    estNow.getHours() <= 12 + 4;

  return (
    <DefaultLayout>
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
    </DefaultLayout>
  );
}
