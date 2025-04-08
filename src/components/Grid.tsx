import styled from "@emotion/styled";

export const Grid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  padding: 0 20px 40px;
  justify-items: center;
  align-items: start;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 1400px) {
    padding: 20px 0 0 0;
  }
`;
