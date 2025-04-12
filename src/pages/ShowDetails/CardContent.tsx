import EpisodeProgress from "./EpisodeProgress";
import { CheckMark } from "assets/icons";
import {
  ContentContainer,
  LeftWrapper,
  RightWrapper,
  Title,
  Description,
  IconWrapper,
} from "./CardContent.styles";

const CardContent = ({
  title,
  description,
  date,
  status,
  resumePoint,
  totalMs,
}: {
  title: string;
  description: string;
  date: string;
  status: string;
  resumePoint: { fully_played: boolean; resume_position_ms: number };
  totalMs: number;
}) => {
  return (
    <ContentContainer>
      <LeftWrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>

        <EpisodeProgress
          date={date}
          status={status}
          resumePoint={resumePoint}
          totalMs={totalMs}
        />
      </LeftWrapper>
      <RightWrapper>
        {resumePoint?.fully_played ? (
          <IconWrapper>
            <CheckMark />
          </IconWrapper>
        ) : (
          <IconWrapper>+</IconWrapper>
        )}
      </RightWrapper>
    </ContentContainer>
  );
};

export default CardContent;
