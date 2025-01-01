import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type AlertType =
  | "success"
  | "danger"
  | "default"
  | "primary"
  | "secondary"
  | "warning";
