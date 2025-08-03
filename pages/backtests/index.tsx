import { title } from "@/components/primitives";
import { useReducer } from "react";
import CourseCodes from "@/components/backtest/coursecodes";
import Courses from "@/components/backtest/courses";
import Backtests from "@/components/backtest/backtests";
import { Breadcrumbs, BreadcrumbItem, Button } from "@heroui/react";
import Error from "@/components/error";
import { BacktestState, ReducerActions } from "@/types/backtest";

interface BacktestPageProps {
  courseCodes: string[];
}

export default function BacktestPage({ courseCodes }: BacktestPageProps) {
  function reducer(
    state: BacktestState,
    action: ReducerActions
  ): BacktestState {
    switch (action.type) {
      case "TO_COURSES":
        return {
          ...state,
          view: "courses",
          currentCourse: null,
          backtests: null,
        };
      case "TO_CODES":
        return {
          ...state,
          view: "codes",
          currentCourseCode: null,
          currentCourse: null,
          backtests: null,
        };
      case "SET_COURSES":
        return {
          ...state,
          view: "courses",
          courses: action.payload.courses,
          currentCourseCode: action.payload.currentCourseCode,
        };
      case "SET_BACKTESTS":
        return {
          ...state,
          view: "backtests",
          backtests: action.payload.backtests,
          currentCourse: action.payload.currentCourse,
        };
      case "ERROR":
        return { ...state, view: "error" };
      default:
        return state;
    }
  }

  const [backtestState, dispatch] = useReducer(reducer, {
    view: courseCodes ? "codes" : "error",
    currentCourseCode: null,
    currentCourse: null,
    courses: null,
    backtests: null,
  });

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
                dispatch({ type: "TO_CODES" });
              }}
              isDisabled={backtestState.view === "codes"}
            >
              Course Codes
            </Button>
          </BreadcrumbItem>
          {backtestState.currentCourseCode && (
            <BreadcrumbItem>
              <Button
                onPress={() => {
                  dispatch({ type: "TO_COURSES" });
                }}
                isDisabled={backtestState.view === "courses"}
              >
                {backtestState.currentCourseCode}
              </Button>
            </BreadcrumbItem>
          )}
          {backtestState.currentCourse && (
            <BreadcrumbItem>
              <Button isDisabled>{backtestState.currentCourse.name}</Button>
            </BreadcrumbItem>
          )}
        </Breadcrumbs>
      </div>
      <div
        style={{
          display: backtestState.view === "codes" ? "block" : "none",
        }}
      >
        <CourseCodes courseCodes={courseCodes} dispatch={dispatch} />
      </div>
      <div
        style={{
          display: backtestState.view === "courses" ? "block" : "none",
        }}
      >
        <Courses courses={backtestState.courses} dispatch={dispatch} />
      </div>
      <div
        style={{
          display: backtestState.view === "backtests" ? "block" : "none",
        }}
      >
        <Backtests backtests={backtestState.backtests} />
      </div>
      <div
        style={{
          display: backtestState.view === "error" ? "block" : "none",
        }}
      >
        <Error title="Failed to load backtests" />
      </div>
    </section>
  );
}

export async function getServerSideProps() {
  const courseCodes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/coursecodes/`
  ).then((res) => res.json());
  return { props: { courseCodes: courseCodes["data"] } };
}
