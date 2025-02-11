import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Chip,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { Selection } from "@react-types/shared";
import { useAuth } from "@/context/AuthContext";
import { fetchLostReportItems, fetchLAFItems } from "@/utils/laf/utils";
import { LostReportItem } from "@/types/laf";
import LAFItems from "./laf-items";
import { LAFItem } from "@/types/laf";

interface NewLostReportsProps {
  view: string;
}

export default function NewLostReports({ view }: NewLostReportsProps) {
  const { logout, auth } = useAuth();
  const isAuthenticated = auth.isAuthenticated;

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
    {
      key: "actions",
      label: "Actions",
    },
  ];

  const [lostReportItems, setLostReportItems] = useState<LostReportItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<Selection | null>(null);
  const [items, setItems] = useState<LAFItem[]>([]);

  const handleSelectionChange = (selection: Selection) => {
    console.log("Selection change: ", selection);
    setSelectedItem(selection);
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (view !== "New Lost Reports") {
        fetchLostReportItems({}, setLostReportItems, logout, true);
      }
    }
  }, [view]);

  useEffect(() => {
    if (selectedItem) {
      console.log("Selected Item: ", selectedItem);
      const selectedReport = lostReportItems.find(
        (item) => item.id === Array.from(selectedItem)[0]
      );
      if (selectedReport === undefined) {
        setSelectedItem(null);
        setItems([]);
      } else {
        console.log("Selected Report: ", selectedReport);
        const formData: Record<string, string> = {
          type: selectedReport.type,
          location: selectedReport.location.join(", "),
          description: selectedReport.description,
        };
        console.log("Form Data: ", formData);
        fetchLAFItems(formData, setItems, logout);
        console.log("Items: ", items);
      }
    }
  }, [selectedItem]);

  return (
    <>
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
          items={lostReportItems}
          emptyContent={"No New Lost Reports found."}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey == "actions" ? (
                    <p>View</p>
                  ) : columnKey === "id" ? (
                    item.type.charAt(0) + item.id
                  ) : columnKey === "location" ? (
                    item.location.map((loc, index) => (
                      <Chip key={index} className="mr-1 my-1">
                        {loc}
                      </Chip>
                    ))
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
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
        items={items}
        lafTypes={[]}
        lafLocations={[]}
        updateTable={() => {}}
        edit={false}
      />
    </>
  );
}
