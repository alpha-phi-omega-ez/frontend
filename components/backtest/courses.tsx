import { Dispatch, SetStateAction } from "react";
import { SelectableCard } from "@/components/selectable-card";
import { useAlert } from "@/context/AlertContext";

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
  const { newAlert } = useAlert();
  const fetchBacktests = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/backtest/${id}`
      );
      if (!response.ok) {
        setView("error");
      } else {
        const data = await response.json();
        setBacktests(data["data"]);
      }
    } catch (error) {
      console.error(error);
      newAlert("Failed to update Lost Report", "danger");
      setView("error");
    }
  };

  const selectCourse = (item: { id: string; name: string }) => {
    fetchBacktests(item.id); // TODO: update to wait for request to be complete
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
              onPress={() => {
                selectCourse(item);
              }}
              title={item.name}
            />
          );
        })}
    </div>
  );
}
