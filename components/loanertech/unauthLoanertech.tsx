import { Card, CardBody } from "@nextui-org/card";

interface UnAuthorizedLoanerTechProps {
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
}

export default function UnAuthorizedLoanerTech({
  loanerTech,
  loanerTechAvailable,
}: UnAuthorizedLoanerTechProps) {
  return (
    <div className="gap-5 grid grid-cols-2 sm:grid-cols-4">
      {Array.isArray(loanerTech) &&
        loanerTech.map((item) => {
          return (
            <Card key={item.id} className="p-2">
              <CardBody>
                <h2 className="text-xl">
                  #{item.id} {item.description}
                </h2>
                <div className="flex pt-2">
                  <div
                    className={`status-indicator ${
                      item.in_office && loanerTechAvailable
                        ? "available"
                        : "unavailable"
                    }`}
                  ></div>
                  <p>
                    {item.in_office && loanerTechAvailable
                      ? "Available"
                      : "Unavailable"}
                  </p>
                </div>
              </CardBody>
            </Card>
          );
        })}
    </div>
  );
}
