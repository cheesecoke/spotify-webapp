import type { SVGProps } from "react";
import { NightTransparentSecondary } from "styles/colors";

export function DividerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="100"
      viewBox="0 0 2 100"
      fill="none"
      {...props}
    >
      <line
        x1="1"
        y1="36"
        x2="0.999999"
        y2="64"
        stroke={NightTransparentSecondary}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
