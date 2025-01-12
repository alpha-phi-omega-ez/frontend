import { LostReportItem } from "@/types/laf";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Chip,
} from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import { EditIcon, LeaveIcon } from "@/components/icons";
import { useState } from "react";
import EditLostReportModal from "./edit-lost-report-modal";
import FoundLostReportModal from "./found-lost-report-modal";

interface LostReportsItemsProps {
  items: LostReportItem[];
  lafTypes: string[];
  lafLocations: string[];
  updateTable: () => void;
  edit: boolean;
}

export default function LostReportItems({
  items,
  lafTypes,
  lafLocations,
  updateTable,
  edit,
}: LostReportsItemsProps) {
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
    ...(edit
      ? [
          {
            key: "actions",
            label: "Actions",
          },
        ]
      : []),
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
  const [location, setLocation] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [id, setId] = useState<string>("0");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  return (
    <>
      <Table aria-label="Lost Reports" className="my-5" isStriped>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items} emptyContent={"No Lost Reports found."}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "actions" ? (
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
                          setName(item.name);
                          setEmail(item.email);
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
                          setName(item.name);
                          setEmail(item.email);
                          onFoundOpen();
                        }}
                      >
                        <LeaveIcon />
                      </button>
                    </div>
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
      {edit && (
        <>
          <EditLostReportModal
            isOpen={isEditOpen}
            onOpenChange={onEditOpenChange}
            lafTypes={lafTypes}
            lafLocations={lafLocations}
            given_type={type}
            given_locations={location}
            given_date={date}
            given_description={description}
            given_id={id}
            given_name={name}
            given_email={email}
            updateTable={updateTable}
          />
          <FoundLostReportModal
            isOpen={isFoundOpen}
            onOpenChange={onFoundOpenChange}
            given_type={type}
            given_locations={location}
            given_date={date}
            given_description={description}
            given_id={id}
            given_name={name}
            given_email={email}
            updateTable={updateTable}
          />
        </>
      )}
    </>
  );
}
