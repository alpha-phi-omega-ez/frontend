import { LAFItem } from "@/types/laf";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/react";
import { useDisclosure } from "@heroui/react";
import { EditIcon, LeaveIcon } from "@/components/icons";
import EditLAFModal from "./edit-laf-modal";
import FoundLAFModal from "./found-laf-modal";
import { useReducer, useEffect } from "react";
import DescriptionCell from "./description-cell";
import { FoundItemModalData } from "@/types/laf";

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

  type Action = { type: "SET_FORM"; payload: FoundItemModalData };

  function formReducer(
    state: FoundItemModalData,
    action: Action
  ): FoundItemModalData {
    switch (action.type) {
      case "SET_FORM":
        return action.payload;
      default:
        return state;
    }
  }

  const [formState, dispatch] = useReducer(formReducer, {
    type: "",
    location: "",
    date: "",
    description: "",
    id: "0",
    modal: null,
  });

  useEffect(() => {
    if (formState.modal === "edit") {
      onEditOpen();
    } else if (formState.modal === "found") {
      onFoundOpen();
    }
  }, [formState]);

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
                              location: item.location,
                              date: `${year}-${month}-${day}`,
                              description: item.description,
                              id: item.id,
                              modal: "edit",
                            },
                          });
                        }}
                      >
                        <EditIcon />
                      </button>
                      <button
                        aria-label="Found Item"
                        onClick={() => {
                          dispatch({
                            type: "SET_FORM",
                            payload: {
                              type: item.type,
                              location: item.location,
                              date: item.date,
                              description: item.description,
                              id: item.id,
                              modal: "found",
                            },
                          });
                        }}
                      >
                        <LeaveIcon />
                      </button>
                    </div>
                  ) : columnKey === "id" ? (
                    item.type.charAt(0) + item.id
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
          <EditLAFModal
            isOpen={isEditOpen}
            onOpenChange={onEditOpenChange}
            lafTypes={lafTypes}
            lafLocations={lafLocations}
            laf_data={formState}
            updateTable={updateTable}
          />
          <FoundLAFModal
            isOpen={isFoundOpen}
            onOpenChange={onFoundOpenChange}
            laf_data={formState}
            updateTable={updateTable}
          />
        </>
      )}
    </>
  );
}
