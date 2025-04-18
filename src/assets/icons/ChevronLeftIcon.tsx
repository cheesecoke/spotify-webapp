import type { SVGProps } from "react";
import { NightTextSecondary } from "styles/colors";

export function ChevronLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.7071 6.29289C14.3166 5.90237 13.6834 5.90237 13.2929 6.29289L8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L13.2929 17.7071C13.6834 18.0976 14.3166 18.0976 14.7071 17.7071C15.0976 17.3166 15.0976 16.6834 14.7071 16.2929L10.4142 12L14.7071 7.70711C15.0976 7.31658 15.0976 6.68342 14.7071 6.29289Z"
        fill={NightTextSecondary}
      />
    </svg>
  );
}
