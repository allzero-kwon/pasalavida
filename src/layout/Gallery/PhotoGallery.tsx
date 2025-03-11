import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/style.css";
import React, { useState, useEffect } from "react";
import images from "@/layout/Gallery/Images.ts";

interface ImageSize {
  alt: string;
  source: string;
  width: number;
  height: number;
}

const PhotoGallery = () => {
  const [imageSizes, setImageSizes] = useState<ImageSize[]>([]);

  useEffect(() => {
    const loadImageSizes = async () => {
      const sizes = await Promise.all(
        images.map((image) => {
          return new Promise<ImageSize>((resolve) => {
            const img = new Image();
            img.src = image.source;
            img.onload = () => {
              resolve({
                alt: image.alt,
                source: image.source,
                width: img.naturalWidth, // 원본 너비
                height: img.naturalHeight, // 원본 높이
              });
            };
          });
        })
      );
      setImageSizes(sizes); // 상태 업데이트
    };

    loadImageSizes();
  }, []);

  const smallItemStyles: React.CSSProperties = {
    cursor: "pointer",
    objectFit: "cover",
    width: "100px",
    height: "150px",
  };

  return (
    <Gallery>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 0fr)",
          gridGap: 2,
        }}
      >
        {imageSizes.map((image, index) => {
          return (
            <Item
              key={index}
              cropped
              original={image.source}
              thumbnail={image.source}
              width={image.width} // 동적으로 계산된 원본 크기
              height={image.height} // 동적으로 계산된 원본 크기
            >
              {({ ref, open }) => (
                <img
                  style={smallItemStyles}
                  alt={image.alt}
                  src={image.source}
                  ref={ref}
                  onClick={open}
                />
              )}
            </Item>
          );
        })}
      </div>
    </Gallery>
  );
};

export default PhotoGallery;
