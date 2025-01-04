import { Card, CardHeader, CardBody } from "@nextui-org/react";

interface BacktestsProps {
  backtests: null | { type: string; backtests: string[] }[];
}

export default function Backtests({ backtests }: BacktestsProps) {
  return (
    <div className="gap-5 grid grid-cols-2 sm:grid-cols-4">
      {Array.isArray(backtests) &&
        backtests.map((item) => {
          return (
            <Card key={item.type}>
              <CardHeader>{item.type}</CardHeader>
              <CardBody>
                {item.backtests.map((test) => {
                  return <p key={test}>{test}</p>;
                })}
              </CardBody>
            </Card>
          );
        })}
    </div>
  );
}
