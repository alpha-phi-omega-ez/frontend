import { Dispatch } from "react";
import { SelectableCard } from "@/components/selectable-card";
import { useAlert } from "@/context/AlertContext";
import { ReducerActions } from "@/types/backtest";

interface CourseCodesProps {
  courseCodes: null | string[];
  dispatch: Dispatch<ReducerActions>;
}

export default function CourseCodes({
  courseCodes,
  dispatch,
}: CourseCodesProps) {
  const { newAlert } = useAlert();

  const fetchCourses = async (code: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/courses/${code}`
      );
      if (!response.ok) {
        dispatch({ type: "ERROR" });
      } else {
        const data = await response.json();
        dispatch({
          type: "SET_COURSES",
          payload: { courses: data["data"], currentCourseCode: code },
        });
      }
    } catch (error) {
      console.error(error);
      newAlert(`Failed to fetch courses for ${code}`, "danger");
      dispatch({ type: "ERROR" });
    }
  };

  return (
    <div className="gap-5 grid grid-cols-2 sm:grid-cols-8">
      {Array.isArray(courseCodes) &&
        courseCodes.map((item) => {
          return (
            <SelectableCard
              key={item}
              onPress={() => {
                fetchCourses(item);
              }}
              title={item}
            />
          );
        })}
    </div>
  );
}
