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

async function BreadcrumbsSection({
  code,
  courseId,
}: {
  code: string;
  courseId: string;
}) {
  let courseName = "This class";

  try {
    const courses = await getCourses(code);
    const course = courses.find((item) => item.id === courseId);
    if (course?.name) {
      courseName = course.name;
    }
  } catch {
    // Keep the placeholder if courses fail; backtests can still load.
  }

  return <BacktestsBreadcrumbs code={code} courseName={courseName} />;
}

async function BacktestsSection({ courseId }: { courseId: string }) {
  const backtests = await getBacktests(courseId);
  return <Backtests backtests={backtests} />;
}

function BacktestsFallback() {
  return (
    <div className="animate-pulse grid grid-cols-2 gap-5 sm:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="h-32 rounded-lg bg-default-200" />
      ))}
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
      <Suspense
        fallback={
          <BacktestsBreadcrumbs code={code} courseName="This class" />
        }
      >
        <BreadcrumbsSection code={code} courseId={courseId} />
      </Suspense>
      <Suspense fallback={<BacktestsFallback />}>
        <BacktestsSection courseId={courseId} />
      </Suspense>
    </section>
  );
}
