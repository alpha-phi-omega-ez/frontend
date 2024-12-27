import { LostReportItem } from "@/types/laf";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

interface LostReportsItemsProps {
  items: LostReportItem[];
}

export default function LostReportItems({ items }: LostReportsItemsProps) {
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

  return (
    <Table aria-label="Lost Reports" className="my-5" isStriped>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items} emptyContent={"No Lost Reports found."}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "location"
                  ? item.location.join(", ")
                  : getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
