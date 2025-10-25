import { LAFItem, LostReportItem } from "@/types/laf";

async function appendLocationParams(
  key: string,
  val: string,
  params: URLSearchParams
) {
  val.split(",").forEach((v) => {
    if (v && v.trim() !== "") params.append(key, v.trim());
  });
}

async function convertFormToParams(formData: Record<string, string>) {
  const params = new URLSearchParams();

  // Prepare params based on form data
  Object.entries(formData).forEach(async ([key, val]) => {
    if (key === "location") {
      await appendLocationParams(key, val, params);
    } else if (val && val.trim() !== "") {
      params.append(key, val);
    }
  });

  return params;
}

export async function fetchLAFItems(
  formData: Record<string, string>,
  dispatch: (action: { type: "SET_ITEMS"; payload: LAFItem[] }) => void,
  logout: () => void
) {
  // Prepare params based on form data
  const params = await convertFormToParams(formData);

  try {
    // Make the fetch request
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/items/?${params}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (response.ok) {
      const response_data = await response.json();
      dispatch({ type: "SET_ITEMS", payload: response_data.data });
    } else if (response.status === 401) {
      logout();
    } else {
      console.error("Failed to fetch LAF items", response);
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: "SET_ITEMS", payload: [] });
  }
}

export async function fetchLostReportItems(
  formData: Record<string, string>,
  dispatch: (action: { type: "SET_ITEMS"; payload: LostReportItem[] }) => void,
  logout: () => void,
  newReports: boolean = false
) {
  // Prepare params based on form data
  const params = await convertFormToParams(formData);

  try {
    // Make the fetch request
    const url = newReports
      ? `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/reports/new`
      : `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/reports/?${params}`;

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const response_data = await response.json();
      dispatch({ type: "SET_ITEMS", payload: response_data.data });
    } else if (response.status === 401) {
      logout();
    } else {
      console.error("Failed to fetch Lost Reports", response);
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: "SET_ITEMS", payload: [] });
  }
}

export async function fetchNewLostReports(
  setNewLostReports: React.Dispatch<React.SetStateAction<number>>
) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/reports/new/count`,
    {
      credentials: "include",
    }
  );
  if (data.ok) {
    const json = await data.json();
    setNewLostReports(json.data);
  }
}
