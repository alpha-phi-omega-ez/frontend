"use client";

import ErrorState from "@/components/error";

export default function GlobalError() {
  return (
    <html lang="en">
      <body>
        <ErrorState title="Something went wrong." />
      </body>
    </html>
  );
}
