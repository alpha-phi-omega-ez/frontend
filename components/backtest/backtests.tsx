import { Card, CardBody } from "@heroui/card";
import Link from "next/link";

import type { Backtest } from "@/types/backtest";

interface BacktestsProps {
  backtests: Backtest[];
}

export default function Backtests({ backtests }: BacktestsProps) {
  if (backtests.length === 0) {
    return (
      <p className="text-center">
        No backtests found. You should check the APO office in person if the
        physical tests exist or contact{" "}
        <Link href="mailto:office@apoez.org">office@apoez.org</Link>
      </p>
    );
  }

  return (
    <div className="gap-5 grid grid-cols-2 sm:grid-cols-4">
      {backtests.map((item) => (
        <Card key={item.type} className="p-2">
          <CardBody>
            <h2 className="text-2xl mb-2 font-bold">{item.type}</h2>
            {item.tests.map((test, index) => (
              <p key={`${index}-${test}`}>{test}</p>
            ))}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
