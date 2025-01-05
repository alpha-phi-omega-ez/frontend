import { Dispatch, SetStateAction } from "react";

export async function fetchLoanerTech(
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
  >,
  logout: () => void
): Promise<void> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/loanertech/`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      setLoanerTech([]);
    } else {
      const data = await response.json();
      setLoanerTech(data["data"]);
      if (!data["loggedIn"]) {
        logout();
      }
    }
  } catch (error) {
    console.error(error);
    setLoanerTech([]);
  }
}

export function isCheckedOut(
  selectedCards: number[],
  loanerTech:
    | false
    | {
        description: string;
        id: number;
        in_office: boolean;
        name?: string;
        phone?: string;
        email?: string;
      }[]
): boolean {
  return selectedCards.every(
    (id) =>
      Array.isArray(loanerTech) &&
      loanerTech.find((item) => item.id === id)?.in_office === false
  );
}

export function checkLoanerTechAvailablility(
  setLoanerTechAvailable: Dispatch<SetStateAction<boolean>>
): void {
  const estNow = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
  );
  setLoanerTechAvailable(
    estNow.getDay() >= 1 &&
      estNow.getDay() <= 5 &&
      estNow.getHours() >= 9 &&
      estNow.getHours() < 12 + 4
  );
}
