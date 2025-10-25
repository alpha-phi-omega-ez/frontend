import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Chip,
  Button,
} from "@heroui/react";
import { useEffect, useReducer } from "react";
import { Selection } from "@react-types/shared";
import { useAuth } from "@/context/AuthContext";
import { fetchLostReportItems, fetchLAFItems } from "@/utils/laf";
import { LostReportItem } from "@/types/laf";
import LAFItems from "./laf-items";
import { LAFItem } from "@/types/laf";
import { useAlert } from "@/context/AlertContext";
import { fetchNewLostReports } from "@/utils/laf";

interface NewLostReportsProps {
  view: string;
  setNewLostReports: React.Dispatch<React.SetStateAction<number>>;
}

export default function NewLostReports({
  view,
  setNewLostReports,
}: NewLostReportsProps) {
  const { logout, auth } = useAuth();
  const isAuthenticated = auth.isAuthenticated;
  const { newAlert } = useAlert();

  const columns = [
    {
      key: "type",
      label: "Type",
    },
    {
      key: "location",
      label: "Locations",
    },
    {
      key: "description",
      label: "Description",
    },
    {
      key: "date",
      label: "Date",
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
  ];

  // State interface for the reducer
  interface NewLostReportsState {
    lostReportItems: LostReportItem[];
    selectedItem: Selection | null;
    items: LAFItem[];
  }

  // Action types for the reducer
  type NewLostReportsAction =
    | { type: "SET_LOST_REPORT_ITEMS"; payload: LostReportItem[] }
    | { type: "SET_SELECTED_ITEM"; payload: Selection | null }
    | { type: "SET_MATCHING_ITEMS"; payload: LAFItem[] }
    | { type: "RESET_SELECTION" };

  // Reducer function
  function newLostReportsReducer(
    state: NewLostReportsState,
    action: NewLostReportsAction
  ): NewLostReportsState {
    switch (action.type) {
      case "SET_LOST_REPORT_ITEMS":
        return { ...state, lostReportItems: action.payload };
      case "SET_SELECTED_ITEM":
        return { ...state, selectedItem: action.payload };
      case "SET_MATCHING_ITEMS":
        return { ...state, items: action.payload };
      case "RESET_SELECTION":
        return { ...state, selectedItem: null, items: [] };
      default:
        return state;
    }
  }

  // Initial state
  const initialState: NewLostReportsState = {
    lostReportItems: [],
    selectedItem: null,
    items: [],
  };

  const [state, dispatch] = useReducer(newLostReportsReducer, initialState);

  // Helper function to handle fetchLostReportItems dispatch mapping
  const handleLostReportItemsDispatch = (action: { type: "SET_ITEMS"; payload: LostReportItem[] }) => {
    dispatch({ type: "SET_LOST_REPORT_ITEMS", payload: action.payload });
  };

  const handleSelectionChange = (selection: Selection) => {
    dispatch({ type: "SET_SELECTED_ITEM", payload: selection });
  };

  const markAsViewed = async () => {
    if (state.selectedItem === null) {
      console.error("No lost report selected");
      newAlert("No lost report selected", "danger");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/reports/new/viewed/${
          Array.from(state.selectedItem)[0]
        }`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (response.ok) {
        fetchLostReportItems({}, handleLostReportItemsDispatch, logout, true);
        fetchNewLostReports(setNewLostReports);
        dispatch({ type: "RESET_SELECTION" });
        newAlert("Lost Report marked as viewed", "success");
      } else {
        console.error("Error marking lost report as viewed");
        newAlert("Error marking lost report as viewed", "danger");
      }
    } catch (error) {
      console.error(error);
      newAlert("Error marking lost report as viewed", "danger");
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isAuthenticated && view === "New Lost Reports") {
      fetchLostReportItems({}, handleLostReportItemsDispatch, logout, true);
      interval = setInterval(() => {
        fetchLostReportItems({}, handleLostReportItemsDispatch, logout, true);
      }, 15000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [view]);

  useEffect(() => {
    if (state.selectedItem) {
      const selectedReport = state.lostReportItems.find(
        (item) => item.id === Array.from(state.selectedItem!)[0]
      );
      if (selectedReport === undefined) {
        dispatch({ type: "RESET_SELECTION" });
      } else {
        const [day, month, year] = selectedReport.date.split("/");
        const formattedDate = `${year}-${month}-${day}`;
        const formData: Record<string, string> = {
          type: selectedReport.type,
          location: selectedReport.location.join(", "),
          date: formattedDate,
          dateFilter: "Before",
        };
        fetchLAFItems(formData, (action) => dispatch({ type: "SET_MATCHING_ITEMS", payload: action.payload }), logout);
      }
    }
  }, [state.selectedItem]);

  return (
    <>
      <h2 className="text-center mt-5 text-3xl">New External Lost Reports</h2>
      <div className="flex justify-center my-4">
        <Button
          color="primary"
          isDisabled={state.selectedItem === null}
          onPress={markAsViewed}
        >
          Mark Lost Report as Viewed
        </Button>
      </div>
      <Table
        aria-label="LAF Items"
        className="my-5"
        isStriped
        selectionMode="single"
        color="primary"
        onSelectionChange={handleSelectionChange}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={state.lostReportItems}
          emptyContent={"No New Lost Reports found."}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "id"
                    ? item.type.charAt(0) + item.id
                    : columnKey === "location"
                    ? item.location.map((loc, index) => (
                        <Chip key={index} className="mr-1 my-1">
                          {loc}
                        </Chip>
                      ))
                    : getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <h2 className="text-center mt-5 text-3xl">
        Potential Matching LAF items
      </h2>
      <LAFItems
        items={state.items}
        lafTypes={[]}
        lafLocations={[]}
        updateTable={() => {}}
        edit={false}
      />
    </>
  );
}
