import { LAFItem } from "@/types/laf";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import { EditIcon, LeaveIcon } from "@/components/icons";
import EditLAFModal from "./edit-laf-modal";
import FoundLAFModal from "./found-laf-modal";
import { useState } from "react";

interface LAFItemsProps {
  items: LAFItem[];
  lafTypes: string[];
  lafLocations: string[];
  updateTable: () => void;
  edit: boolean;
}

export default function LAFItems({
  items,
  lafTypes,
  lafLocations,
  updateTable,
  edit,
}: LAFItemsProps) {
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
    {
      key: "actions",
      label: "Actions",
    },
  ];
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();
  const {
    isOpen: isFoundOpen,
    onOpen: onFoundOpen,
    onOpenChange: onFoundOpenChange,
  } = useDisclosure();
  const [type, setType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [id, setId] = useState<string>("0");

  return (
    <>
      <Table aria-label="LAF Items" className="my-5" isStriped>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items} emptyContent={"No LAF items found."}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "actions" && edit ? (
                    <div className="flex items-center space-x-2">
                      <button
                        aria-label="Edit"
                        onClick={() => {
                          setType(item.type);
                          setLocation(item.location);
                          const [month, day, year] = item.date.split("/");
                          setDate(`${year}-${month}-${day}`);
                          setDescription(item.description);
                          setId(item.id);
                          onEditOpen();
                        }}
                      >
                        <EditIcon />
                      </button>
                      <button
                        aria-label="Found Item"
                        onClick={() => {
                          setType(item.type);
                          setLocation(item.location);
                          setDate(item.date);
                          setDescription(item.description);
                          setId(item.id);
                          onFoundOpen();
                        }}
                      >
                        <LeaveIcon />
                      </button>
                    </div>
                  ) : columnKey === "id" ? (
                    item.type.charAt(0) + item.id
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {edit && (
        <>
          <EditLAFModal
            isOpen={isEditOpen}
            onOpenChange={onEditOpenChange}
            lafTypes={lafTypes}
            lafLocations={lafLocations}
            given_type={type}
            given_location={location}
            given_date={date}
            given_description={description}
            given_id={id}
            updateTable={updateTable}
          />
          <FoundLAFModal
            isOpen={isFoundOpen}
            onOpenChange={onFoundOpenChange}
            given_type={type}
            given_location={location}
            given_date={date}
            given_description={description}
            given_id={id}
            updateTable={updateTable}
          />
        </>
      )}
    </>
  );
}
