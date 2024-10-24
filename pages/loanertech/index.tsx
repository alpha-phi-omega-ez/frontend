import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import LoanerTech from "./loanertech";
import { useEffect, useState } from "react";

export default function LoanerTechPage() {
  const [loanerTech, setLoanerTech] = useState<
    false | { description: string; id: number; in_office: boolean }[]
  >([]);

  const fetchLoanerTech = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/loanertech`
    );

    if (!response.ok) {
      setLoanerTech([]);
    } else {
      const data = await response.json();
      setLoanerTech(data["data"]);
    }
  };

  useEffect(() => {
    fetchLoanerTech();
  }, []);

  const loading = (
    <div className="flex justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );

  const error = (
    <div className="text-red-500 text-center">
      There was an error fetching the loaner tech data.
    </div>
  );

  return (
    <DefaultLayout>
      <section className="justify-center pb-4 md:pb-6 text-center">
        <div className="mb-10">
          <h1 className={title()}>Loaner Tech</h1>
        </div>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {!loanerTech && loading}
          {Array.isArray(loanerTech) &&
            loanerTech.map((item, index) => (
              <LoanerTech
                key={index}
                desc={item.description}
                id={item.id}
                inoffice={item.in_office}
              />
            ))}
          {loanerTech && !loanerTech.length && error}
        </div>
      </section>
    </DefaultLayout>
  );
}
