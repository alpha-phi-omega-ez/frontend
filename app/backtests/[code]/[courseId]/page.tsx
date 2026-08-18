import type { Metadata } from "next";
import { Suspense } from "react";

import { title } from "@/components/primitives";
import BacktestsBreadcrumbs from "@/components/backtest/breadcrumbs";
import Backtests from "@/components/backtest/backtests";
import { getBacktests, getCourses } from "@/utils/backtest";

interface CourseBacktestsPageProps {
  params: Promise<{ code: string; courseId: string }>;
}

// Dynamic segment + root pathname providers need a blocking route.
export const instant = false;

export async function generateMetadata({
  params,
}: CourseBacktestsPageProps): Promise<Metadata> {
  const { code, courseId } = await params;
  return {
    title: `${courseId} | ${code} | Backtests`,
  };
}

async function BacktestsSection({
  code,
  courseId,
}: {
  code: string;
  courseId: string;
}) {
  const [backtests, courses] = await Promise.all([
    getBacktests(courseId),
    getCourses(code),
  ]);
  const course = courses.find((item) => item.id === courseId);

  return (
    <>
      <BacktestsBreadcrumbs
        code={code}
        courseName={course?.name ?? courseId}
      />
      <Backtests backtests={backtests} />
    </>
  );
}

function BacktestsFallback() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-10 w-96 rounded-md bg-default-200" />
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-32 rounded-lg bg-default-200" />
        ))}
      </div>
    </div>
  );
}

export default async function CourseBacktestsPage({
  params,
}: CourseBacktestsPageProps) {
  const { code, courseId } = await params;

  return (
    <section className="justify-center pb-4 md:pb-6">
      <div className="text-center mb-6">
        <h1 className={title()}>Backtests</h1>
      </div>
      <Suspense fallback={<BacktestsFallback />}>
        <BacktestsSection code={code} courseId={courseId} />
      </Suspense>
    </section>
  );
}
