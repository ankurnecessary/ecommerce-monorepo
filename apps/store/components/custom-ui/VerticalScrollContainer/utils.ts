// Update the thumb height based on content
export const updateThumbHeight = (
  container: HTMLDivElement | null,
  content: HTMLDivElement | null,
  thumb: HTMLDivElement | null,
) => {
  if (!content || !container || !thumb) return;

  const containerHeight = container.offsetHeight;
  const contentHeight = content.scrollHeight;
  const thumbHeight = (containerHeight / contentHeight) * containerHeight;
  thumb.style.height = `${thumbHeight}px`;
};

// Sync thumb position with scroll
export const syncThumbPosition = (
  container: HTMLDivElement | null,
  content: HTMLDivElement | null,
  thumb: HTMLDivElement | null,
) => {
  if (!content || !container || !thumb) return;

  const scrollTop = content.scrollTop;
  const scrollHeight = content.scrollHeight - container.offsetHeight;
  const thumbTop =
    (scrollTop / scrollHeight) * (container.offsetHeight - thumb.offsetHeight);
  thumb.style.top = `${thumbTop}px`;
};
