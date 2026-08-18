import { SelectableCard } from "@/components/selectable-card";
import type { Course } from "@/types/backtest";

interface CoursesProps {
  code: string;
  courses: Course[];
}

export default function Courses({ code, courses }: CoursesProps) {
  return (
    <div className="gap-5 grid grid-cols-2 sm:grid-cols-4">
      {courses.map((item) => (
        <SelectableCard
          key={item.id}
          href={`/backtests/${encodeURIComponent(code)}/${encodeURIComponent(item.id)}`}
          title={item.name}
        />
      ))}
    </div>
  );
}
