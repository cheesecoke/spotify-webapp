export default function mapToCardItems(items: any[]) {
  return items.map((item) => ({
    id: item.id,
    title: item.trackTitle || item.name || item.title,
    image:
      item.image || item.images?.[0]?.url || item.album?.images?.[0]?.url || "",
    imageAlt: item.trackTitle || item.name || item.title,
    description:
      item.artistName ||
      item.artists?.[0]?.name ||
      item.description ||
      item.type,
    uri: item.uri,
  }));
}
