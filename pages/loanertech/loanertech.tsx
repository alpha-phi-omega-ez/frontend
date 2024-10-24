import { Card, CardBody, CardHeader } from "@nextui-org/card";
interface LoanerTechProps {
  inoffice: boolean;
  desc: string;
  id: number;
}

export default function LoanerTech({ desc, id, inoffice }: LoanerTechProps) {
  return (
    <Card className="p-2">
      <CardBody>
        <h2 className="text-xl">
          #{id} {desc}
        </h2>
        <div className="flex pt-2">
          <div
            className={`status-indicator ${
              inoffice ? "available" : "unavailable"
            }`}
          ></div>
          <p>{inoffice ? "Available" : "Unavailable"}</p>
        </div>
      </CardBody>
    </Card>
  );
}
