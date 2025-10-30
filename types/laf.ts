export type ViewState =
  | "Submit Lost Item"
  | "Find Lost Item"
  | "Submit Lost Report"
  | "Find Lost Report"
  | "New Lost Reports"
  | "Expired Items"
  | "error";

export type LAFItem = {
  id: number;
  display_id: string;
  type: string;
  location: string;
  date: string;
  description: string;
  found: string;
  archived: string;
};

export type LostReportItem = {
  id: string;
  name: string;
  email: string;
  type: string;
  location: string[];
  date: string;
  description: string;
  found: string;
  archived: string;
};

export type NewLostReportFormData = {
  type: string;
  location: string;
  date: string;
  name: string;
  email: string;
  description: string;
};

export type FoundItemFormData = {
  type: string;
  location: string;
  date: string;
  description: string;
};

export type FoundItemModalData = {
  type: string;
  location: string;
  date: string;
  description: string;
  id: number;
  modal: "edit" | "found" | null;
};

export type LostReportModalData = {
  type: string;
  locations: string[];
  date: string;
  description: string;
  id: string;
  name: string;
  email: string;
  modal: "edit" | "archive" | null;
};
