import styled from "@emotion/styled";
import { formatTimeMinSec } from "utils";
import { formatDate } from "utils";
import { NightTextSecondary } from "styles/colors";

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  color: ${NightTextSecondary};
`;

const TimeRemaining = styled.div`
  flex-shrink: 0;
  font-size: 12px;
`;

const BarBackground = styled.div`
  width: 120px;
  height: 4px;
  background-color: #282828; /* A darker background */
  border-radius: 2px;
  margin-left: 5px;
`;

const BarFill = styled.div<{ remaining: number }>`
  width: ${({ remaining }) => remaining * 100}%;
  height: 4px;
  background-color: #1db954; /* Spotify green */
  border-radius: 2px;
  transition: width 0.2s ease-in-out;
`;

const Date = styled.div`
  flex-shrink: 0;
  font-size: 12px;
`;

const Status = styled.div`
  flex-shrink: 0;
  font-size: 12px;
`;

function EpisodeProgress({
  resumePoint,
  totalMs,
  date,
  status,
}: {
  resumePoint: { fully_played: boolean; resume_position_ms: number };
  totalMs: number;
  date: string;
  status: string;
}) {
  if (!resumePoint || resumePoint.fully_played) {
    return null;
  }

  const playedMs = resumePoint.resume_position_ms;
  const remaining = playedMs / totalMs;
  const timeRemainingMs = totalMs - playedMs;

  return (
    <ProgressContainer>
      <Date>{formatDate(date)}</Date>
      <Status>{status}</Status>
      <TimeRemaining>{formatTimeMinSec(timeRemainingMs)}</TimeRemaining>
      <BarBackground>
        <BarFill remaining={remaining} />
      </BarBackground>
    </ProgressContainer>
  );
}

export default EpisodeProgress;
