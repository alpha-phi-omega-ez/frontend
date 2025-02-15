export type ViewState =
  | "Found Item"
  | "Lost Items"
  | "Submit Lost Report"
  | "Find Lost Report"
  | "New Lost Reports"
  | "Expired Items"
  | "Archive"
  | "error";

export type LAFItem = {
  id: string;
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
