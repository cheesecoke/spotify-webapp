import styled from "@emotion/styled";

export const Grid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  padding-bottom: 40px;
  justify-items: center;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  }
`;
