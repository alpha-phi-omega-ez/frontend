import { title } from "@/components/primitives";
import { useState } from "react";
import CourseCodes from "@/components/backtest/coursecodes";
import Courses from "@/components/backtest/courses";
import Backtests from "@/components/backtest/backtests";
import { Breadcrumbs, BreadcrumbItem, Button } from "@nextui-org/react";
import Error from "@/components/error";

interface BacktestPageProps {
  courseCodes: string[];
}

export default function BacktestPage({ courseCodes }: BacktestPageProps) {
  const [view, setView] = useState<"codes" | "courses" | "backtests" | "error">(
    courseCodes ? "codes" : "error"
  );
  const [currentCourseCode, setCurrentCourseCode] = useState<null | string>(
    null
  );
  const [currentCourse, setCurrentCourse] = useState<null | {
    id: string;
    name: string;
  }>(null);
  const [courses, setCourses] = useState<null | { id: string; name: string }[]>(
    null
  );
  const [backtests, setBacktests] = useState<
    null | { type: string; tests: string[] }[]
  >(null);

  return (
    <section className="justify-center pb-4 md:pb-6">
      <div className="text-center mb-6">
        <h1 className={title()}>Backtests</h1>
      </div>
      <div className="mb-10">
        <Breadcrumbs>
          <BreadcrumbItem>
            <Button
              onPress={() => {
                setView("codes");
                setCurrentCourseCode(null);
                setCurrentCourse(null);
                setBacktests(null);
              }}
              isDisabled={view === "codes"}
            >
              Course Codes
            </Button>
          </BreadcrumbItem>
          {currentCourseCode && (
            <BreadcrumbItem>
              <Button
                onPress={() => {
                  setView("courses");
                  setCurrentCourse(null);
                  setBacktests(null);
                }}
                isDisabled={view === "courses"}
              >
                {currentCourseCode}
              </Button>
            </BreadcrumbItem>
          )}
          {currentCourse && (
            <BreadcrumbItem>
              <Button isDisabled>{currentCourse.name}</Button>
            </BreadcrumbItem>
          )}
        </Breadcrumbs>
      </div>
      <div
        style={{
          display: view === "codes" ? "block" : "none",
        }}
      >
        <CourseCodes
          courseCodes={courseCodes}
          setView={setView}
          setCurrentCourseCode={setCurrentCourseCode}
          setCourses={setCourses}
        />
      </div>
      <div
        style={{
          display: view === "courses" ? "block" : "none",
        }}
      >
        <Courses
          courses={courses}
          setCurrentCourse={setCurrentCourse}
          setView={setView}
          setBacktests={setBacktests}
        />
      </div>
      <div
        style={{
          display: view === "backtests" ? "block" : "none",
        }}
      >
        <Backtests backtests={backtests} />
      </div>
      <div
        style={{
          display: view === "error" ? "block" : "none",
        }}
      >
        <Error title="Failed to load backtests" />
      </div>
    </section>
  );
}

export async function getServerSideProps() {
  const courseCodes = await fetch(
    `${process.env.NEXT_INTERNAL_BACKEND_SERVER}/coursecodes/`
  ).then((res) => res.json());
  return { props: { courseCodes: courseCodes["data"] } };
}
