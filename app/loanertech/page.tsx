import type { Metadata } from "next";
import { Suspense } from "react";

import LoanerTechClient from "@/app/loanertech/loanertech-client";

export const metadata: Metadata = {
  title: "Loaner Tech",
};

export default function LoanerTechPage() {
  return (
    <Suspense>
      <LoanerTechClient />
    </Suspense>
  );
}
