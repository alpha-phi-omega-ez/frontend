import { Dispatch, SetStateAction } from "react";
import { SelectableCard } from "@/components/selectable-card";

interface CoursesProps {
  courses: null | { id: string; name: string }[];
  setCurrentCourse: Dispatch<
    SetStateAction<{
      id: string;
      name: string;
    } | null>
  >;
  setView: Dispatch<
    SetStateAction<"codes" | "courses" | "backtests" | "error">
  >;
  setBacktests: Dispatch<
    SetStateAction<
      | {
          type: string;
          tests: string[];
        }[]
      | null
    >
  >;
}

export default function Courses({
  courses,
  setCurrentCourse,
  setView,
  setBacktests,
}: CoursesProps) {
  const fetchBacktests = async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/backtest/${id}`
    );
    if (!response.ok) {
      setView("error");
    } else {
      const data = await response.json();
      setBacktests(data["data"]);
    }
  };

  const selectCourse = (item: { id: string; name: string }) => {
    fetchBacktests(item.id);
    setCurrentCourse(item);
    setView("backtests");
  };

  return (
    <div className="gap-5 grid grid-cols-2 sm:grid-cols-4">
      {Array.isArray(courses) &&
        courses.map((item) => {
          return (
            <SelectableCard
              key={item.id}
              onClick={() => {
                selectCourse(item);
              }}
              title={item.name}
            />
          );
        })}
    </div>
  );
}
