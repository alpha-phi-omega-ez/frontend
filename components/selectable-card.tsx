"use client";

import Link from "next/link";
import { Card, CardBody } from "@heroui/react";

interface SelectableCardProps {
  title: string;
  href: string;
}

export function SelectableCard({ title, href }: SelectableCardProps) {
  return (
    <Card
      as={Link}
      href={href}
      isPressable
      isHoverable
      style={{ cursor: "pointer", width: "100%" }}
    >
      <CardBody>
        <h2>{title}</h2>
      </CardBody>
    </Card>
  );
}
