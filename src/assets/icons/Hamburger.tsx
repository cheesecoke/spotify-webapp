import type { SVGProps } from "react";
import { NightTransparentPrimary } from "styles/colors";

export function HamburgerIcon({
  color = NightTransparentPrimary,
  size = 24,
  props,
}: {
  color?: string;
  size?: number;
  props?: SVGProps<SVGSVGElement>;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
