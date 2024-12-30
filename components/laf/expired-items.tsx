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
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface ExpiredItemsProps {
  lafTypes: string[];
  view: string;
}

export default function ExpiredItems({ lafTypes, view }: ExpiredItemsProps) {
  const { auth, logout } = useAuth();
  const isAuthenticated = auth.isAuthenticated;
  const columns = [
    {
      key: "id",
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

  const [expiredItems, setExpiredItems] = useState<LAFItem[]>([]);
  const [potentiallyExpiredItems, setPotentiallyExpiredItems] = useState<
    LAFItem[]
  >([]);
  const [searchData, setSearchData] = useState<Record<string, string>>({
    type: "All",
    water_bottle: "30",
    clothing: "90",
    umbrella: "90",
    inexpensive: "180",
    expensive: "365",
  });

  const fetchExpiredItems = async () => {
    const params = new URLSearchParams(searchData);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/items/expired/?${params}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (response.ok) {
      const response_data = await response.json();
      setExpiredItems(response_data.data.expired);
      setPotentiallyExpiredItems(response_data.data.potential);
    } else if (response.status === 401) {
      logout();
    } else {
      console.error("Failed to fetch expired LAF items", response);
    }
  };

  useEffect(() => {
    if (isAuthenticated && view === "Expired Items") {
      fetchExpiredItems();
    }
  }, [view, searchData]);

  const handleChange = (name: string, value: any) => {
    // Allow only numbers and ensure it's >= 0
    if (/^\d*$/.test(value) || name === "type") {
      setSearchData((prevData) => ({
        ...prevData,
        [name]: value === "" ? "0" : value,
      }));
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
        >
          <SelectItem key="All" value="All">
            All
          </SelectItem>
          <>
            {lafTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </>
        </Select>
        {/* Water Bottle Field */}
        <Input
          label="Water Bottle Days"
          type="number"
          min="0"
          value={searchData.water_bottle || "0"}
          onChange={(e) => {
            handleChange("water_bottle", e.target.value);
          }}
        />
        {/* Apparel Field */}
        <Input
          label="Apparel Days"
          type="number"
          min="0"
          value={searchData.clothing || "0"}
          onChange={(e) => {
            handleChange("clothing", e.target.value);
          }}
        />
        {/* Umbrella Field */}
        <Input
          label="Umbrella Days"
          type="number"
          min="0"
          value={searchData.umbrella || "0"}
          onChange={(e) => {
            handleChange("umbrella", e.target.value);
          }}
        />
        {/* Inexpensive Field */}
        <Input
          label="Inexpensive Days"
          type="number"
          min="0"
          value={searchData.inexpensive || "0"}
          onChange={(e) => {
            handleChange("inexpensive", e.target.value);
          }}
        />
        {/* Expensive Field */}
        <Input
          label="Expensive Days"
          type="number"
          min="0"
          value={searchData.expensive || "0"}
          onChange={(e) => {
            handleChange("expensive", e.target.value);
          }}
        />
      </div>
      <h2 className="text-center mt-5 text-3xl">Expired Items</h2>
      <Table
        aria-label="Expired LAF Items"
        className="my-5"
        isStriped
        color="primary"
        selectionMode="multiple"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={expiredItems}
          emptyContent={"No expired LAF items found."}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "id"
                    ? item.type.charAt(0) + item.id
                    : getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <h2 className="text-center mt-5 text-3xl">Potentially Expired Items</h2>
      <Table
        aria-label="Expired LAF Items"
        className="my-5"
        isStriped
        color="primary"
        selectionMode="multiple"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={potentiallyExpiredItems}
          emptyContent={"No expired LAF items found."}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "id"
                    ? item.type.charAt(0) + item.id
                    : getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
