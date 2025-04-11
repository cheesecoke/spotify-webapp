import type { SVGProps } from "react";

export function CheckMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.7071 6.66789C20.0976 7.05842 20.0976 7.69158 19.7071 8.08211L10.7071 17.0821C10.3166 17.4726 9.68342 17.4726 9.29289 17.0821L4.29289 12.0821C3.90237 11.6916 3.90237 11.0584 4.29289 10.6679C4.68342 10.2774 5.31658 10.2774 5.70711 10.6679L10 14.9608L18.2929 6.66789C18.6834 6.27737 19.3166 6.27737 19.7071 6.66789Z"
        fill="#1DB954"
      />
    </svg>
  );
}
