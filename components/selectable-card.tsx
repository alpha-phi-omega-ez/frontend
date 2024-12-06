import { Card, CardBody } from "@nextui-org/react";

interface SelectableCardProps {
  title: string;
  onClick: () => void;
}

export function SelectableCard({ title, onClick }: SelectableCardProps) {
  return (
    <Card
      isPressable
      isHoverable
      onPress={onClick}
      style={{ cursor: "pointer", width: "100%" }}
    >
      <CardBody>
        <h2>{title}</h2>
      </CardBody>
    </Card>
  );
}
