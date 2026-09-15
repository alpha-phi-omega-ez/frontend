import type { Metadata } from "next";
import { Suspense } from "react";

import LoanerTechAdminClient from "@/app/loanertech/admin/admin-client";

export const metadata: Metadata = {
  title: "Loaner Tech Admin",
};

export default function LoanerTechAdminPage() {
  return (
    <Suspense>
      <LoanerTechAdminClient />
    </Suspense>
  );
}
