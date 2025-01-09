import { Card, Link, CardBody } from "@nextui-org/react";

interface BacktestsProps {
  backtests: null | { type: string; tests: string[] }[];
}

export default function Backtests({ backtests }: BacktestsProps) {
  return (
    <>
      {Array.isArray(backtests) && backtests.length > 0 && (
        <div className="gap-5 grid grid-cols-2 sm:grid-cols-4">
          {backtests.map((item) => {
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
          {Array.isArray(backtests) && backtests.length === 0 && (
            <p className="text-center">
              No backtests found. You should check the APO office in person if
              the physical tests exist or contact{" "}
              <Link href="mailto:office@apoez.org">office@apoez.org</Link>
            </p>
          )}
        </div>
      )}
      {Array.isArray(backtests) && backtests.length === 0 && (
        <p className="text-center">
          No backtests found. You should check the APO office in person if the
          physical tests exist or contact{" "}
          <Link href="mailto:office@apoez.org">office@apoez.org</Link>
        </p>
      )}
    </>
  );
}
