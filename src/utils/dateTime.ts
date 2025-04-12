// TODO: Consolidate date formatting
export function formatTime(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return seconds === "60"
    ? minutes + 1 + ":00"
    : minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
}

interface TrackItem {
  track?: { duration_ms?: number };
  duration_ms?: number;
}

export function formatDuration(items: TrackItem[]) {
  const totalMs = items.reduce((acc, item) => {
    const ms = item.track?.duration_ms || item.duration_ms || 0;
    return acc + ms;
  }, 0);

  const hours = Math.floor(totalMs / 3600000);
  const minutes = Math.floor((totalMs % 3600000) / 60000);

  return `${hours ? `${hours} hr ` : ""}${minutes} min`;
}

export const formatTimeMinSec = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes} min ${seconds} sec left`;
};

export function formatDate(dateInput: string | Date): string {
  if (!dateInput) return "";

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
