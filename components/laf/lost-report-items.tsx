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
} from "@heroui/react";
import { useDisclosure } from "@heroui/react";
import { EditIcon, LeaveIcon } from "@/components/icons";
import { useReducer, useEffect } from "react";
import EditLostReportModal from "./edit-lost-report-modal";
import ArchiveLostReportModal from "./archive-lost-report-modal";
import DescriptionCell from "./description-cell";
import { LostReportModalData } from "@/types/laf";

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
    isOpen: isArchiveOpen,
    onOpen: onArchiveOpen,
    onOpenChange: onArchiveOpenChange,
  } = useDisclosure();

  type Action = { type: "SET_FORM"; payload: LostReportModalData };

  function formReducer(
    state: LostReportModalData,
    action: Action
  ): LostReportModalData {
    switch (action.type) {
      case "SET_FORM":
        return action.payload;
      default:
        return state;
    }
  }

  const [formState, dispatch] = useReducer(formReducer, {
    type: "",
    locations: [""],
    date: "",
    description: "",
    id: "0",
    name: "",
    email: "",
    modal: null,
  });

  useEffect(() => {
    if (formState.modal === "edit") {
      onEditOpen();
    } else if (formState.modal === "archive") {
      onArchiveOpen();
    }
  }, [formState]);

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
                          const [month, day, year] = item.date.split("/");
                          dispatch({
                            type: "SET_FORM",
                            payload: {
                              type: item.type,
                              locations: item.location,
                              date: `${year}-${month}-${day}`,
                              description: item.description,
                              id: item.id,
                              name: item.name,
                              email: item.email,
                              modal: "edit",
                            },
                          });
                        }}
                      >
                        <EditIcon />
                      </button>
                      <button
                        aria-label="Submit Lost Item"
                        onClick={() => {
                          dispatch({
                            type: "SET_FORM",
                            payload: {
                              type: item.type,
                              locations: item.location,
                              date: item.date,
                              description: item.description,
                              id: item.id,
                              name: item.name,
                              email: item.email,
                              modal: "archive",
                            },
                          });
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
                  ) : columnKey === "description" ? (
                    <DescriptionCell description={item.description} />
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
            lost_report_data={formState}
            updateTable={updateTable}
          />
          <ArchiveLostReportModal
            isOpen={isArchiveOpen}
            onOpenChange={onArchiveOpenChange}
            lost_report_data={formState}
            updateTable={updateTable}
          />
        </>
      )}
    </>
  );
}
