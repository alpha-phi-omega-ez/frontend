import { Card, CardHeader, CardBody } from "@nextui-org/react";

interface BacktestsProps {
  backtests: null | { type: string; tests: string[] }[];
}

export default function Backtests({ backtests }: BacktestsProps) {
  return (
    <div className="gap-5 grid grid-cols-2 sm:grid-cols-4">
      {Array.isArray(backtests) &&
        backtests.map((item) => {
          return (
            <Card key={item.type} className="p-2">
              <CardBody>
                <h2 className="text-2xl mb-2 font-bold">{item.type}</h2>
                {item.tests.map((test) => {
                  return <p key={test}>{test}</p>;
                })}
              </CardBody>
            </Card>
          );
        })}
    </div>
  );
}
