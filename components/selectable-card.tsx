import { Card, CardBody } from "@heroui/react";

interface SelectableCardProps {
  title: string;
  onPress: () => void;
}

export default function SelectableCard({
  title,
  onPress,
}: SelectableCardProps) {
  return (
    <Card
      isPressable
      isHoverable
      onPress={onPress}
      style={{ cursor: "pointer", width: "100%" }}
    >
      <CardBody>
        <h2>{title}</h2>
      </CardBody>
    </Card>
  );
}
