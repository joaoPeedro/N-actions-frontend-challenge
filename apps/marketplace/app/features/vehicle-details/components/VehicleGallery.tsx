import { useState } from "react";

import { Button, Stack } from "@ds/design-system";

import styles from "./VehicleGallery.module.css";

interface VehicleGalleryProps {
  imageUrls: string[];
  vehicleName: string;
}

export function VehicleGallery({ imageUrls, vehicleName }: VehicleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const fallbackImage = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=60";
  const images = imageUrls.length > 0 ? imageUrls : [fallbackImage];
  const activeImage = images[activeIndex] || fallbackImage;

  return (
    <Stack gap="medium">
      <div className={styles.mainImageContainer}>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <img 
          src={activeImage} 
          alt={`${vehicleName} - View ${activeIndex + 1}`} 
          className={styles.mainImage} 
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
      </div>
      {images.length > 1 && (
        <div className={styles.thumbnailsGrid} role="group" aria-label="Vehicle image gallery">
          {images.map((url, idx) => (
            <Button
              key={idx}
              variant="ghost"
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Show gallery image ${idx + 1}`}
              aria-pressed={idx === activeIndex}
              className={`${styles.thumbnailButton} ${idx === activeIndex ? styles.activeThumbnail : ""}`}
            >
              {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
              <img 
                src={url} 
                alt={`${vehicleName} thumbnail ${idx + 1}`} 
                className={styles.thumbnailImage}
                onError={(e) => {
                  e.currentTarget.src = fallbackImage;
                }}
              />
            </Button>
          ))}
        </div>
      )}
    </Stack>
  );
}
