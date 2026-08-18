import type { Metadata } from "next";
import { Suspense } from "react";

import { title } from "@/components/primitives";
import BacktestsBreadcrumbs from "@/components/backtest/breadcrumbs";
import Courses from "@/components/backtest/courses";
import { getCourses } from "@/utils/backtest";

interface CourseCodePageProps {
  params: Promise<{ code: string }>;
}

// Dynamic segment + root pathname providers need a blocking route.
export const instant = false;

export async function generateMetadata({
  params,
}: CourseCodePageProps): Promise<Metadata> {
  const { code } = await params;
  return {
    title: `${code} | Backtests`,
  };
}

async function CoursesSection({ code }: { code: string }) {
  const courses = await getCourses(code);
  return <Courses code={code} courses={courses} />;
}

function CoursesFallback() {
  return (
    <div className="animate-pulse grid grid-cols-2 gap-5 sm:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="h-16 rounded-lg bg-default-200" />
      ))}
    </div>
  );
}

export default async function CourseCodePage({ params }: CourseCodePageProps) {
  const { code } = await params;

  return (
    <section className="justify-center pb-4 md:pb-6">
      <div className="text-center mb-6">
        <h1 className={title()}>Backtests</h1>
      </div>
      <BacktestsBreadcrumbs code={code} />
      <Suspense fallback={<CoursesFallback />}>
        <CoursesSection code={code} />
      </Suspense>
    </section>
  );
}
