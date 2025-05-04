import { useState } from "react";

export default function DescriptionCell({
  description,
}: {
  description: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`max-w-xs ${expanded ? "" : "truncate"}`}
      title={description}
      onClick={() => setExpanded(!expanded)}
      style={{ cursor: "pointer" }}
    >
      {description}
    </div>
  );
}
