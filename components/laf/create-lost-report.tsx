import { Dispatch, SetStateAction } from "react";
import CreateLostReportFormSwitch from "./create-lost-report-form-switch";
import CreateLostReportForm from "./create-lost-report-form";

interface NewLostReportFormProps {
  lafTypes: string[];
  lafLocations: string[];
  view: string;
  switchToLostReport: Record<string, string> | null;
  setSwitchToLostReport: Dispatch<
    SetStateAction<Record<string, string> | null>
  >;
}

export default function NewLostReport({
  lafTypes,
  lafLocations,
  view,
  switchToLostReport,
  setSwitchToLostReport,
}: NewLostReportFormProps) {
  return (
    <>
      {switchToLostReport ? (
        <CreateLostReportFormSwitch
          lafTypes={lafTypes}
          lafLocations={lafLocations}
          view={view}
          switchToLostReport={switchToLostReport}
          setSwitchToLostReport={setSwitchToLostReport}
        />
      ) : (
        <CreateLostReportForm
          lafTypes={lafTypes}
          lafLocations={lafLocations}
          view={view}
          setSwitchToLostReport={setSwitchToLostReport}
        />
      )}
    </>
  );
}
