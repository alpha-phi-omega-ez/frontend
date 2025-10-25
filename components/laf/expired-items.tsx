import { LAFItem } from "@/types/laf";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Select,
  SelectItem,
  Input,
  Button,
} from "@heroui/react";
import { useEffect, useReducer } from "react";
import { Selection } from "@react-types/shared";
import { useAuth } from "@/context/AuthContext";
import { useAlert } from "@/context/AlertContext";

interface ExpiredItemsProps {
  lafTypes: string[];
  view: string;
}

export default function ExpiredItems({ lafTypes, view }: ExpiredItemsProps) {
  const { auth, logout } = useAuth();
  const isAuthenticated = auth.isAuthenticated;
  const { newAlert } = useAlert();
  const columns = [
    {
      key: "display_id",
      label: "ID",
    },
    {
      key: "type",
      label: "Type",
    },
    {
      key: "location",
      label: "Location",
    },
    {
      key: "description",
      label: "Description",
    },
    {
      key: "date",
      label: "Date",
    },
  ];

  // State interface for the reducer
  interface ExpiredItemsState {
    expiredItems: LAFItem[];
    potentiallyExpiredItems: LAFItem[];
    searchData: Record<string, string>;
    expiredSelectedKeys: string[];
    potentiallyExpiredSelectedKeys: string[];
  }

  // Action types for the reducer
  type ExpiredItemsAction =
    | { type: "SET_EXPIRED_ITEMS"; payload: LAFItem[] }
    | { type: "SET_POTENTIALLY_EXPIRED_ITEMS"; payload: LAFItem[] }
    | { type: "SET_SEARCH_FIELD"; payload: { name: string; value: string } }
    | { type: "SET_EXPIRED_SELECTION"; payload: string[] }
    | { type: "SET_POTENTIALLY_EXPIRED_SELECTION"; payload: string[] }
    | { type: "RESET_SELECTIONS" };

  // Reducer function
  function expiredItemsReducer(
    state: ExpiredItemsState,
    action: ExpiredItemsAction
  ): ExpiredItemsState {
    switch (action.type) {
      case "SET_EXPIRED_ITEMS":
        return { ...state, expiredItems: action.payload };
      case "SET_POTENTIALLY_EXPIRED_ITEMS":
        return { ...state, potentiallyExpiredItems: action.payload };
      case "SET_SEARCH_FIELD":
        return {
          ...state,
          searchData: {
            ...state.searchData,
            [action.payload.name]: action.payload.value,
          },
        };
      case "SET_EXPIRED_SELECTION":
        return { ...state, expiredSelectedKeys: action.payload };
      case "SET_POTENTIALLY_EXPIRED_SELECTION":
        return { ...state, potentiallyExpiredSelectedKeys: action.payload };
      case "RESET_SELECTIONS":
        return {
          ...state,
          expiredSelectedKeys: [],
          potentiallyExpiredSelectedKeys: [],
        };
      default:
        return state;
    }
  }

  // Initial state
  const initialState: ExpiredItemsState = {
    expiredItems: [],
    potentiallyExpiredItems: [],
    searchData: {
      type: "All",
      water_bottle: "30",
      clothing: "90",
      umbrella: "90",
      inexpensive: "180",
      expensive: "365",
    },
    expiredSelectedKeys: [],
    potentiallyExpiredSelectedKeys: [],
  };

  const [state, dispatch] = useReducer(expiredItemsReducer, initialState);

  const fetchExpiredItems = async () => {
    const params = new URLSearchParams(state.searchData);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/items/expired/?${params}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const response_data = await response.json();
        dispatch({ type: "SET_EXPIRED_ITEMS", payload: response_data.data.expired });
        dispatch({ type: "SET_POTENTIALLY_EXPIRED_ITEMS", payload: response_data.data.potential });
      } else if (response.status === 401) {
        logout();
      } else {
        console.error("Failed to fetch expired LAF items", response);
      }
    } catch (error) {
      console.error(error);
      newAlert(`Failed to fetch expired items`, "danger");
    }
  };

  useEffect(() => {
    if (isAuthenticated && view !== "Expired Items") {
      dispatch({ type: "RESET_SELECTIONS" });
    }
    if (isAuthenticated && view === "Expired Items") {
      fetchExpiredItems();
    }
  }, [view, state.searchData]);

  const handleChange = (name: string, value: string) => {
    // Allow only numbers and ensure it's >= 0
    if (/^\d*$/.test(value) || name === "type") {
      dispatch({
        type: "SET_SEARCH_FIELD",
        payload: { name, value: value === "" ? "0" : value },
      });
    }
  };

  const handleExpiredTableSelectionChange = (keys: Selection) => {
    const selectedKeysArray = Array.from(keys) as string[];
    dispatch({ type: "SET_EXPIRED_SELECTION", payload: selectedKeysArray });
  };

  const handlePotentiallyExpiredTableSelectionChange = (keys: Selection) => {
    const selectedKeysArray = Array.from(keys) as string[];
    dispatch({ type: "SET_POTENTIALLY_EXPIRED_SELECTION", payload: selectedKeysArray });
  };

  const archiveItems = async (table: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/items/archive/`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids:
              table === "expired"
                ? state.expiredSelectedKeys
                : state.potentiallyExpiredSelectedKeys,
          }),
        }
      );

      if (response.ok) {
        fetchExpiredItems();
        if (table === "expired") {
          dispatch({ type: "SET_EXPIRED_SELECTION", payload: [] });
        } else {
          dispatch({ type: "SET_POTENTIALLY_EXPIRED_SELECTION", payload: [] });
        }
        newAlert("Successfully archived items", "success");
      } else if (response.status === 401) {
        logout();
      } else {
        console.error("Failed to archive expired LAF items", response);
        newAlert("Failed to archive expired LAF items", "danger");
      }
    } catch (error) {
      console.error(error);
      newAlert("Failed to archive expired LAF items", "danger");
    }
  };

  return (
    <>
      <div className="flex flex-row gap-3">
        {/* Type Field */}
        <Select
          label="Type"
          variant="bordered"
          placeholder="Select a Type"
          onChange={(e) => {
            handleChange("type", e.target.value);
          }}
          defaultSelectedKeys={["All"]}
          scrollShadowProps={{
            isEnabled: false,
          }}
        >
          <SelectItem key="All">All</SelectItem>
          <>
            {lafTypes.map((type) => (
              <SelectItem key={type}>{type}</SelectItem>
            ))}
          </>
        </Select>
        {/* Water Bottle Field */}
        <Input
          label="Water Bottle Days"
          type="number"
          min="0"
          value={state.searchData.water_bottle || "0"}
          onChange={(e) => {
            handleChange("water_bottle", e.target.value);
          }}
        />
        {/* Apparel Field */}
        <Input
          label="Apparel Days"
          type="number"
          min="0"
          value={state.searchData.clothing || "0"}
          onChange={(e) => {
            handleChange("clothing", e.target.value);
          }}
        />
        {/* Umbrella Field */}
        <Input
          label="Umbrella Days"
          type="number"
          min="0"
          value={state.searchData.umbrella || "0"}
          onChange={(e) => {
            handleChange("umbrella", e.target.value);
          }}
        />
        {/* Inexpensive Field */}
        <Input
          label="Inexpensive Days"
          type="number"
          min="0"
          value={state.searchData.inexpensive || "0"}
          onChange={(e) => {
            handleChange("inexpensive", e.target.value);
          }}
        />
        {/* Expensive Field */}
        <Input
          label="Expensive Days"
          type="number"
          min="0"
          value={state.searchData.expensive || "0"}
          onChange={(e) => {
            handleChange("expensive", e.target.value);
          }}
        />
      </div>
      <div className="text-center mt-10 flex justify-center gap-5">
        <h2 className="text-3xl">Expired Items</h2>
        <Button
          color="primary"
          isDisabled={state.expiredSelectedKeys.length === 0}
          onPress={() => archiveItems("expired")}
        >
          Archive Item{state.expiredSelectedKeys.length > 1 ? "s" : ""}
        </Button>
      </div>
      <Table
        aria-label="Expired LAF Items"
        className="my-5"
        isStriped
        color="primary"
        selectionMode="multiple"
        selectedKeys={state.expiredSelectedKeys}
        onSelectionChange={handleExpiredTableSelectionChange}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={state.expiredItems}
          emptyContent={"No expired LAF items found."}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "id" ? (
                    item.type.charAt(0) + item.id
                  ) : columnKey === "description" ? (
                    <div className="truncate max-w-xs" title={item.description}>
                      {item.description}
                    </div>
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="text-center mt-10 flex justify-center gap-5">
        <h2 className="text-3xl">Potentially Expired Items</h2>
        <Button
          color="primary"
          isDisabled={state.potentiallyExpiredSelectedKeys.length === 0}
          onPress={() => archiveItems("potentially-expired")}
        >
          Archive Item{state.potentiallyExpiredSelectedKeys.length > 1 ? "s" : ""}
        </Button>
      </div>
      <Table
        aria-label="Potentially Expired LAF Items"
        className="my-5"
        isStriped
        color="primary"
        selectionMode="multiple"
        selectedKeys={state.potentiallyExpiredSelectedKeys}
        onSelectionChange={handlePotentiallyExpiredTableSelectionChange}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={state.potentiallyExpiredItems}
          emptyContent={"No potentially expired LAF items found."}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "id" ? (
                    item.type.charAt(0) + item.id
                  ) : columnKey === "description" ? (
                    <div className="truncate max-w-xs" title={item.description}>
                      {item.description}
                    </div>
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
