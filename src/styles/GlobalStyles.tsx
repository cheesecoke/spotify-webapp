// src/styles/GlobalStyles.tsx
/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";
import { NightTextPrimary, NightBackgroundPrimary } from "styles/colors";

const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html,
      body {
        height: 100%;
        font-family: "Inter", sans-serif;
        background-color: ${NightBackgroundPrimary};
        color: ${NightTextPrimary};
      }

      h1 {
        font-size: 24px;
      }

      h2 {
        font-size: 18px;
      }

      h3 {
        font-size: 16px;
      }

      p {
        font-size: 14px;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      ul {
        list-style: none;
      }

      button {
        cursor: pointer;
        font-family: inherit;
        border: none;
        background: none;
        padding: 0;
        outline: none;
        appearance: none;
      }
    `}
  />
);

export default GlobalStyles;
