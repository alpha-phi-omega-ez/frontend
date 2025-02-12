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
import { useEffect, useState } from "react";
import { Selection } from "@react-types/shared";
import { useAuth } from "@/context/AuthContext";
import { fetchLostReportItems, fetchLAFItems } from "@/utils/laf/utils";
import { LostReportItem } from "@/types/laf";
import LAFItems from "./laf-items";
import { LAFItem } from "@/types/laf";
import { useAlert } from "@/context/AlertContext";

interface NewLostReportsProps {
  view: string;
  fetchNewLostReports: () => void;
}

export default function NewLostReports({
  view,
  fetchNewLostReports,
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

  const [lostReportItems, setLostReportItems] = useState<LostReportItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<Selection | null>(null);
  const [items, setItems] = useState<LAFItem[]>([]);

  const handleSelectionChange = (selection: Selection) => {
    console.log("Selection change: ", selection);
    setSelectedItem(selection);
  };

  const markAsViewed = async () => {
    if (selectedItem === null) {
      console.error("No item selected");
      newAlert("No lost report selected", "danger");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/reports/new/viewed/${
          Array.from(selectedItem)[0]
        }`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (response.ok) {
        fetchLostReportItems({}, setLostReportItems, logout, true);
        fetchNewLostReports();
        setItems([]);
        setSelectedItem(null);
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
    if (isAuthenticated && view === "New Lost Reports") {
      fetchLostReportItems({}, setLostReportItems, logout, true);
    }
  }, [view]);

  useEffect(() => {
    if (selectedItem) {
      const selectedReport = lostReportItems.find(
        (item) => item.id === Array.from(selectedItem)[0]
      );
      if (selectedReport === undefined) {
        setSelectedItem(null);
        setItems([]);
      } else {
        const formData: Record<string, string> = {
          type: selectedReport.type,
          location: selectedReport.location.join(", "),
          description: selectedReport.description,
        };
        fetchLAFItems(formData, setItems, logout);
      }
    }
  }, [selectedItem]);

  return (
    <>
      <h2 className="text-center mt-5 text-3xl">New External Lost Reports</h2>
      <div className="flex justify-center my-4">
        <Button
          color="primary"
          isDisabled={selectedItem === null}
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
          items={lostReportItems}
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
        items={items}
        lafTypes={[]}
        lafLocations={[]}
        updateTable={() => {}}
        edit={false}
      />
    </>
  );
}
