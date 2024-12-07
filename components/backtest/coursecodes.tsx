import { Dispatch, SetStateAction } from "react";
import { SelectableCard } from "@/components/selectable-card";

interface CourseCodesProps {
  courseCodes: null | string[];
  setCurrentCourseCode: Dispatch<SetStateAction<string | null>>;
  setView: Dispatch<
    SetStateAction<"codes" | "courses" | "backtests" | "error">
  >;
  setCourses: Dispatch<
    SetStateAction<
      | {
          id: string;
          name: string;
        }[]
      | null
    >
  >;
}

export default function CourseCodes({
  courseCodes,
  setCurrentCourseCode,
  setView,
  setCourses,
}: CourseCodesProps) {
  const fetchCourses = async (code: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/courses/${code}`
    );
    if (!response.ok) {
      setView("error");
    } else {
      const data = await response.json();
      setCourses(data["data"]);
    }
  };

  const selectCode = (code: string) => {
    fetchCourses(code);
    setCurrentCourseCode(code);
    setView("courses");
  };

  return (
    <div className="gap-5 grid grid-cols-2 sm:grid-cols-8">
      {Array.isArray(courseCodes) &&
        courseCodes.map((item) => {
          return (
            <SelectableCard
              key={item}
              onClick={() => {
                selectCode(item);
              }}
              title={item}
            />
          );
        })}
    </div>
  );
}
