"use client";

import { Button } from "@heroui/react";
import { useEffect } from "react";

import ErrorState from "@/components/error";

export default function CourseBacktestsError({
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
      <ErrorState title="Failed to load backtests" />
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
