import styled from "@emotion/styled";

export const ItemWrapper = styled.div`
  text-align: center;
`;

export const Image = styled.img`
  width: 100%;
  border-radius: 8px;
`;

export const Title = styled.p`
  margin-top: 10px;
  color: white;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
  padding-bottom: 40px;
`;
