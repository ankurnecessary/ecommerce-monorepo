import type { ImgHTMLAttributes } from "react";

export default function MockNextImage(
  props: ImgHTMLAttributes<HTMLImageElement>,
) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} />;
}