import { Dispatch } from "react";
import { SelectableCard } from "@/components/selectable-card";
import { useAlert } from "@/context/AlertContext";
import { ReducerActions } from "@/types/backtest";

interface CoursesProps {
  courses: null | { id: string; name: string }[];
  dispatch: Dispatch<ReducerActions>;
}

export default function Courses({ courses, dispatch }: CoursesProps) {
  const { newAlert } = useAlert();
  const fetchBacktests = async (item: { id: string; name: string }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/backtest/${item.id}`
      );
      if (!response.ok) {
        dispatch({ type: "ERROR" });
      } else {
        const data = await response.json();
        dispatch({
          type: "SET_BACKTESTS",
          payload: { backtests: data["data"], currentCourse: item },
        });
      }
    } catch (error) {
      console.error(error);
      newAlert("Failed to update Lost Report", "danger");
      dispatch({ type: "ERROR" });
    }
  };

  return (
    <div className="gap-5 grid grid-cols-2 sm:grid-cols-4">
      {Array.isArray(courses) &&
        courses.map((item) => {
          return (
            <SelectableCard
              key={item.id}
              onPress={() => {
                fetchBacktests(item);
              }}
              title={item.name}
            />
          );
        })}
    </div>
  );
}
