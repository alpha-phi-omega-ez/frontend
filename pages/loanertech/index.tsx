import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import LoanerTech from "./loanertech";
import { useEffect, useState } from "react";

export default function LoanerTechPage() {
  const [loanerTech, setLoanerTech] = useState<
    { description: string; id: number; in_office: boolean }[]
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

  return (
    <DefaultLayout>
      <section className="justify-center pb-4 md:pb-6 text-center">
        <h1 className={title()}>Loaner Tech</h1>
        <br />
        {!loanerTech.length && "Loading..."}
        {Array.isArray(loanerTech) &&
          loanerTech.map((item, index) => (
            <LoanerTech
              key={index}
              desc={item.description}
              id={item.id}
              inoffice={item.in_office}
            />
          ))}
      </section>
    </DefaultLayout>
  );
}
