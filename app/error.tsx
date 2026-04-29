"use client";

import { Button } from "@heroui/react";
import { useEffect } from "react";

import ErrorState from "@/components/error";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <ErrorState title="Something went wrong." />
      <div className="flex justify-center -mt-2 mb-10">
        <Button
          className="p-6 text-lg"
          onPress={() => reset()}
          variant="bordered"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
