import type { SVGProps } from "react";

export function PlayIcon({
  width = "40",
  height = "40",
  fill = "black",
  props,
}: {
  width?: string;
  height?: string;
  fill?: string;
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
      <path
        d="M10 30.354V9.66854C10 8.63892 11.1174 7.99783 12.0063 8.51747L29.6977 18.8602C30.5783 19.375 30.5783 20.6475 29.6977 21.1623L12.0063 31.505C11.1174 32.0247 10 31.3836 10 30.354Z"
        fill={fill}
      />
    </svg>
  );
}
