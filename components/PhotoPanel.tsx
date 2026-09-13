import Image from "next/image";

type Photo = { src: string; alt: string };

export default function PhotoPanel({ photos }: { photos: Photo[] }) {
  return (
    <div className="photo-panel">
      {photos.map((photo) => (
        <div key={photo.src} className="photo-panel__item">
          <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 768px) 33vw, 380px" />
        </div>
      ))}
    </div>
  );
}
