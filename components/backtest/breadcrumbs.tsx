"use client";

import Link from "next/link";
import { Breadcrumbs, BreadcrumbItem, Button } from "@heroui/react";

interface BacktestsBreadcrumbsProps {
  code?: string;
  courseName?: string;
}

export default function BacktestsBreadcrumbs({
  code,
  courseName,
}: BacktestsBreadcrumbsProps) {
  return (
    <div className="mb-10">
      <Breadcrumbs>
        <BreadcrumbItem>
          <Button as={Link} href="/backtests" isDisabled={!code}>
            Course Codes
          </Button>
        </BreadcrumbItem>
        {code && (
          <BreadcrumbItem>
            <Button
              as={Link}
              href={`/backtests/${encodeURIComponent(code)}`}
              isDisabled={!courseName}
            >
              {code}
            </Button>
          </BreadcrumbItem>
        )}
        {courseName && (
          <BreadcrumbItem>
            <Button isDisabled>{courseName}</Button>
          </BreadcrumbItem>
        )}
      </Breadcrumbs>
    </div>
  );
}
