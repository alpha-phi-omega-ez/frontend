import type { Metadata } from "next";
import { Suspense } from "react";

import { title } from "@/components/primitives";
import BacktestsBreadcrumbs from "@/components/backtest/breadcrumbs";
import CourseCodes from "@/components/backtest/coursecodes";
import { getCourseCodes } from "@/utils/backtest";

export const metadata: Metadata = {
  title: "Backtests",
};

async function CourseCodesSection() {
  const courseCodes = await getCourseCodes();
  return <CourseCodes courseCodes={courseCodes} />;
}

function CourseCodesFallback() {
  return (
    <div className="animate-pulse grid grid-cols-2 gap-5 sm:grid-cols-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="h-16 rounded-lg bg-default-200" />
      ))}
    </div>
  );
}

export default function BacktestsPage() {
  return (
    <section className="justify-center pb-4 md:pb-6">
      <div className="text-center mb-6">
        <h1 className={title()}>Backtests</h1>
      </div>
      <p className="mb-6">
        To access our backtest system, come to our office, Union 3420, Monday-Friday between 10:00 am and 5:00 pm. 
        You may take photos of exams. Photos taken must be for personal use only. We do not allow posting, distributing, 
        or profiting in any way from photos taken of our exam catalog.
      </p>
      <BacktestsBreadcrumbs />
      <Suspense fallback={<CourseCodesFallback />}>
        <CourseCodesSection />
      </Suspense>
    </section>
  );
}
