import { SVGProps } from "react";

export function PauseIcon({
  width = "40",
  height = "40",
  props,
}: {
  width?: string;
  height?: string;
  props?: SVGProps<SVGSVGElement>;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      {...props}
    >
      <rect x="10" y="8" width="6" height="24" rx="1" fill="black" />
      <rect x="24" y="8" width="6" height="24" rx="1" fill="black" />
    </svg>
  );
}
