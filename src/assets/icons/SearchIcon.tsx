import { NightTextSecondary } from "styles/colors";
import type { SVGProps } from "react";

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.5 15C22.5 19.1421 19.1421 22.5 15 22.5C10.8579 22.5 7.5 19.1421 7.5 15C7.5 10.8579 10.8579 7.5 15 7.5C19.1421 7.5 22.5 10.8579 22.5 15ZM21.2883 23.4096C19.5354 24.7224 17.3585 25.5 15 25.5C9.20101 25.5 4.5 20.799 4.5 15C4.5 9.20101 9.20101 4.5 15 4.5C20.799 4.5 25.5 9.20101 25.5 15C25.5 17.3585 24.7224 19.5354 23.4096 21.2883L30.3857 28.2643C30.9714 28.8501 30.9714 29.7999 30.3857 30.3857C29.7999 30.9714 28.8501 30.9714 28.2643 30.3857L21.2883 23.4096Z"
        fill={NightTextSecondary}
      />
    </svg>
  );
}
