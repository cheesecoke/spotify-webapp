import styled from "@emotion/styled";
import { NightTransparentSecondary } from "styles/colors";
import { SkeletonAnimation } from "styles/animations";

export const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  width: 100%;
  height: 300px;
`;

export const SkeletonLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 60%;
  width: 100%;
  justify-content: space-around;
  border-radius: 10px;
  background: ${NightTransparentSecondary};
  gap: 20px;
  margin: 30px;
  min-height: 300px;
  ${SkeletonAnimation}
`;
export const SkeletonRightWrapper = styled.div`
  flex: 0 0 40%;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px 0;
`;

export const SkeletonHeading = styled.div`
  display: flex;
  flex-direction: row;
  height: 20px;
  width: 100px;
  background: ${NightTransparentSecondary};
  ${SkeletonAnimation}
`;

const TopElementSkeleton = () => {
  return (
    <SkeletonWrapper>
      <SkeletonLeftWrapper />
      <SkeletonRightWrapper>
        <SkeletonHeading />
      </SkeletonRightWrapper>
    </SkeletonWrapper>
  );
};

export default TopElementSkeleton;
