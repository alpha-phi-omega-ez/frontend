import { Card, CardBody } from "@heroui/card";
import { isCheckedOut } from "@/utils/loanertech/utils";
import { Dispatch, SetStateAction } from "react";
import { LoanerTechType } from "@/types/loanertech";

interface AuthorizedLoanerTechProps {
  loanerTech: false | LoanerTechType[];
  selectedCards: number[];
  setSelectedCards: Dispatch<SetStateAction<number[]>>;
}

export default function AuthorizedLoanerTech({
  loanerTech,
  selectedCards,
  setSelectedCards,
}: AuthorizedLoanerTechProps) {
  const toggleCardSelection = (id: number, inOffice: boolean): boolean => {
    let changed = false;
    let wasRemoved = false;
    setSelectedCards((prev) => {
      if (prev.includes(id)) {
        wasRemoved = true;
        changed = true;
        return prev.filter((cardId) => cardId !== id);
      }
      return prev;
    });

    const checkedOut = isCheckedOut(selectedCards, loanerTech);

    if (
      !wasRemoved &&
      (selectedCards.length === 0 ||
        (checkedOut && !inOffice) ||
        (!checkedOut && inOffice))
    ) {
      setSelectedCards((prev) => [...prev, id]);
      changed = true;
    }

    return changed;
  };

  const confirmDetailsExist = (item: {
    name?: string;
    phone?: string;
    email?: string;
  }): boolean => {
    return (
      item.name !== undefined &&
      item.name !== "" &&
      item.phone !== undefined &&
      item.phone !== "" &&
      item.email !== undefined &&
      item.email !== ""
    );
  };

  return (
    <div className="gap-5 grid grid-cols-2 sm:grid-cols-4">
      {Array.isArray(loanerTech) &&
        loanerTech.map((item) => {
          let isSelected = selectedCards.includes(item.id);

          return (
            <Card
              key={item.id}
              className={`p-2 border ${
                isSelected ? "border-blue-500" : "border-transparent"
              }`}
              onPress={() => {
                const operationMode = isCheckedOut(selectedCards, loanerTech)
                  ? "check-in"
                  : "check-out";
                const isDisabled =
                  selectedCards.length > 0 &&
                  ((operationMode === "check-in" && item.in_office) ||
                    (operationMode === "check-out" && !item.in_office));
                if (!isDisabled) {
                  if (toggleCardSelection(item.id, item.in_office)) {
                    isSelected = isSelected ? false : true;
                  }
                }
              }}
              isPressable={true}
            >
              <CardBody>
                <h2 className="text-xl mb-1">
                  #{item.id} {item.description}
                </h2>
                <div className="flex pt-2">
                  <div
                    className={`status-indicator ${
                      item.in_office ? "available" : "unavailable"
                    }`}
                  ></div>
                  <p>{item.in_office ? "Available" : "Unavailable"}</p>
                </div>
                {confirmDetailsExist(item) && (
                  <div className="flex flex-col mt-2">
                    <div className="flex justify-between mb-1">
                      <p>{item.name}</p>
                      <p>{item.email}</p>
                    </div>
                    <p>{item.phone}</p>
                  </div>
                )}
              </CardBody>
            </Card>
          );
        })}
    </div>
  );
}
