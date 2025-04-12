// TODO: Is it better to break these out by page?
// This might be doing too much.
export function mapToCardItems(
  items: any[],
  config: { unwrap?: "show" | "episode" | "track" | "category" } = {},
) {
  return items.map((item) => {
    let itemType = item;
    if (config.unwrap === "show" && item.show) {
      itemType = item.show;
    } else if (config.unwrap === "episode" && item.episode) {
      itemType = item.episode;
    } else if (config.unwrap === "track" && item.track) {
      itemType = item.track;
    } else if (config.unwrap === "category") {
      itemType = {
        ...item,
        name: item.name,
        icons: item.icons,
        href: item.href,
        type: "category",
        image: item.icons?.[0]?.url || "",
      };
    }

    return {
      id: itemType.id,
      title: itemType.trackTitle || itemType.name || itemType.title,
      image:
        itemType.image ||
        itemType.images?.[0]?.url ||
        itemType.images?.[1]?.url ||
        itemType.album?.images?.[0]?.url ||
        itemType.icons?.[0]?.url ||
        null,
      imageAlt: itemType.trackTitle || itemType.name || itemType.title,
      description:
        itemType.artistName ||
        itemType.artists?.[0]?.name ||
        itemType.description ||
        itemType.type ||
        "",
      uri:
        itemType.uri ||
        itemType.trackUri ||
        (config.unwrap === "category" ? itemType.href : undefined),
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
