import { SelectableCard } from "@/components/selectable-card";

interface CourseCodesProps {
  courseCodes: string[];
}

export default function CourseCodes({ courseCodes }: CourseCodesProps) {
  return (
    <div className="gap-5 grid grid-cols-2 sm:grid-cols-8">
      {courseCodes.map((item) => (
        <SelectableCard
          key={item}
          href={`/backtests/${encodeURIComponent(item)}`}
          title={item}
        />
      ))}
    </div>
  );
}
