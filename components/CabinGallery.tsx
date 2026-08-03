"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { CabinPhoto } from "@/lib/cabins";

export function CabinGallery({ cabinName, photos }: { cabinName: string; photos: CabinPhoto[] }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((value) => value === null ? 0 : (value + 1) % photos.length);
      if (event.key === "ArrowLeft") setActive((value) => value === null ? 0 : (value - 1 + photos.length) % photos.length);
    };
    document.body.classList.add("lightbox-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("lightbox-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, photos.length]);

  const preview = photos.slice(0, 5);

  return (
    <>
      <div className="cabin-gallery" aria-label={`${cabinName} photo gallery`}>
        {preview.map((photo, index) => (
          <button
            className={`cabin-photo cabin-photo-${index + 1}`}
            type="button"
            key={photo.src}
            onClick={() => setActive(index)}
            aria-label={`Open ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={index === 0 ? "(max-width: 900px) 100vw, 48vw" : "(max-width: 900px) 50vw, 24vw"}
            />
            {index === 4 && photos.length > preview.length ? (
              <span className="cabin-photo-count">View all {photos.length} photos</span>
            ) : null}
          </button>
        ))}
      </div>

      {active !== null ? (
        <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label={`${cabinName} photos`} onMouseDown={(event) => {
          if (event.currentTarget === event.target) setActive(null);
        }}>
          <button className="lightbox-close" type="button" onClick={() => setActive(null)} aria-label="Close photo gallery">×</button>
          <button className="lightbox-arrow lightbox-prev" type="button" onClick={() => setActive((value) => value === null ? 0 : (value - 1 + photos.length) % photos.length)} aria-label="Previous photo">‹</button>
          <figure className="lightbox-figure">
            <div className="lightbox-image-wrap">
              <Image src={photos[active].src} alt={photos[active].alt} fill priority sizes="92vw" />
            </div>
            <figcaption>
              <span>{cabinName}</span>
              <strong>{photos[active].alt}</strong>
              <small>{active + 1} of {photos.length}</small>
            </figcaption>
          </figure>
          <button className="lightbox-arrow lightbox-next" type="button" onClick={() => setActive((value) => value === null ? 0 : (value + 1) % photos.length)} aria-label="Next photo">›</button>
        </div>
      ) : null}
    </>
  );
}
