import Image from "next/image";

export default function TimelineLogoBadge({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <span className="timeline__logo-badge">
      <Image src={src} alt={alt} width={width} height={height} loading="lazy" />
    </span>
  );
}
