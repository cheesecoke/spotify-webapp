import styled from "@emotion/styled";
import { SkeletonAnimation } from "styles/animations";
import { SkeletonBackground } from "styles/colors";

const SkeletonPageHeading = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 268px;
  padding: 0 30px;
  margin: 0;
  background: ${SkeletonBackground};
  ${SkeletonAnimation}
`;

export default SkeletonPageHeading;
