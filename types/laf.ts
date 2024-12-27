export type ViewState =
    | "Found Item"
    | "Lost Items"
    | "Submit Lost Report"
    | "Find Lost Report"
    | "Matching Lost Reports"
    | "Expired Items"
    | "Archive"
    | "error";

export type LAFItem = {
    id: string;
    type: string;
    location: string;
    date: string;
    description: string;
    found: string;
    archived: string;
}

export type LostReportItem = {
    id: string
    name: string;
    email: string;
    type: string;
    location: string[];
    date: string;
    description: string;
    found: string;
    archived: string;
}