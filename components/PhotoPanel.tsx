import Image from "next/image";

type Photo = { src: string; alt: string; position?: string };

export default function PhotoPanel({ photos }: { photos: Photo[] }) {
  return (
    <div className="photo-panel">
      {photos.map((photo) => (
        <div key={photo.src} className="photo-panel__item">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            quality={90}
            sizes="(max-width: 768px) 33vw, 380px"
            style={photo.position ? { objectPosition: photo.position } : undefined}
          />
        </div>
      ))}
    </div>
  );
}
