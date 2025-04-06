export function mapToCardItems(items: any[]) {
  return items.map((item) => {
    const isCategory = item.icons && item.href;
    return {
      id: item.id,
      title: item.trackTitle || item.name || item.title,
      image:
        item.image ||
        item.images?.[0]?.url ||
        item.album?.images?.[0]?.url ||
        item.icons?.[0]?.url ||
        "",
      imageAlt: item.trackTitle || item.name || item.title,
      description:
        item.artistName ||
        item.artists?.[0]?.name ||
        item.description ||
        item.type ||
        (isCategory ? "Category" : ""),
      uri: item.uri || (isCategory ? item.href : undefined),
    };
  });
}

export function mapTrackToCardItem(items: any) {
  return items.map((item: any) => ({
    id: item.id,
    title: item.name,
    time: item.duration_ms,
    name: item.artists?.[0]?.name || "",
    uri: item.uri,
    href: item.href,
  }));
}

export function formatTime(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return seconds === "60"
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
