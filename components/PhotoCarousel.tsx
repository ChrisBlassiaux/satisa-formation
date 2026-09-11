"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Photo = { src: string; alt: string };

export default function PhotoCarousel({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % photos.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [photos.length]);

  return (
    <div className="photo-carousel">
      <div className="photo-carousel__viewport">
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            className={`photo-carousel__slide${i === index ? " is-active" : ""}`}
            aria-hidden={i === index ? undefined : true}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 90vw, 480px"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
      <div className="photo-carousel__dots" role="tablist" aria-label="Photos de Chris Blassiaux">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Photo ${i + 1}`}
            className={`photo-carousel__dot${i === index ? " is-active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
