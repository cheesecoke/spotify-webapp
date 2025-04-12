import styled from "@emotion/styled";
import { BluePurpleGradientOpacity } from "styles/colors";

export const TinyHorizontalCardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  transition: all 0.2s ease;
`;

export const TinyImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
`;

export const TinyTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const TinyTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TinySubtitle = styled.div`
  font-size: 12px;
  color: #ccc;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ControlButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }
`;

export const GlobalPlayerContainer = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: ${BluePurpleGradientOpacity};
  display: flex;
  align-items: center;
  margin: 0 30px;
  padding: 0 20px;
  z-index: 1000;
  border-radius: 5px 5px 0 0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.2);
  transform: ${({ visible }) =>
    visible ? "translateY(0)" : "translateY(100%)"};
  transition: transform 0.3s ease-in-out;
`;
