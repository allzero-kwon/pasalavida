import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/style.css";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { getImagesById } from "@/layout/Gallery/Images.ts";
import { ref as dbRef, onValue } from "firebase/database";
import { realtimeDb } from "@/firebase";
import { useUserData } from "@/context/UserDataContext";

interface ImageSize {
  alt: string;
  source: string;
  width: number;
  height: number;
}

const PhotoGallery = () => {
  const { id } = useUserData();
  const [imageSizes, setImageSizes] = useState<ImageSize[]>([]);
  const [layout, setLayout] = useState("grid");

  useEffect(() => {
    const galleryRef = dbRef(realtimeDb, `galleries/${id}/photos`);
    const orderRef = dbRef(realtimeDb, `galleries/${id}/order`);
    const layoutRef = dbRef(realtimeDb, `galleries/${id}/layout`);

    // Fetch layout
    onValue(layoutRef, (snap) => {
        if (snap.exists()) setLayout(snap.val());
    });

    const unsubscribe = onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        onValue(orderRef, (orderSnap) => {
          const order = orderSnap.val() as string[];
          let photoList: ImageSize[] = [];
          if (order) {
            photoList = order
              .map(pId => data[pId] ? {
                alt: data[pId].name,
                source: data[pId].url,
                width: data[pId].width,
                height: data[pId].height
              } : null)
              .filter(p => p !== null) as ImageSize[];
          } else {
            photoList = Object.values(data).map((p: any) => ({
              alt: p.name,
              source: p.url,
              width: p.width,
              height: p.height
            }));
          }
          setImageSizes(photoList);
        }, { onlyOnce: true });
      } else {
        loadLocalImages();
      }
    });

    const loadLocalImages = async () => {
      const localImages = getImagesById(id);
      const sizes = await Promise.all(
        localImages.map((image) => {
          return new Promise<ImageSize>((resolve) => {
            const img = new Image();
            img.src = image.source;
            img.onload = () => {
              resolve({
                alt: image.alt,
                source: image.source,
                width: img.naturalWidth,
                height: img.naturalHeight,
              });
            };
          });
        })
      );
      setImageSizes(sizes);
    };

    return () => unsubscribe();
  }, [id]);

  const renderLayout = () => {
      switch(layout) {
          case "slide":
              return (
                  <SlideContainer>
                      {imageSizes.map((image, index) => (
                          <Item key={index} original={image.source} thumbnail={image.source} width={image.width} height={image.height}>
                              {({ ref, open }) => (
                                  <SlideImg ref={ref as any} onClick={open} src={image.source} alt={image.alt} />
                              )}
                          </Item>
                      ))}
                  </SlideContainer>
              );
          case "scroll":
              return (
                  <ScrollContainer>
                      {imageSizes.map((image, index) => (
                          <Item key={index} original={image.source} thumbnail={image.source} width={image.width} height={image.height}>
                              {({ ref, open }) => (
                                  <ScrollImg ref={ref as any} onClick={open} src={image.source} alt={image.alt} />
                              )}
                          </Item>
                      ))}
                  </ScrollContainer>
              );
          case "grid":
          default:
            return (
                <Grid>
                    {imageSizes.map((image, index) => (
                    <Item
                        key={index}
                        cropped
                        original={image.source}
                        thumbnail={image.source}
                        width={image.width}
                        height={image.height}
                    >
                        {({ ref, open }) => (
                        <Thumb
                            ref={ref as any}
                            onClick={open}
                        >
                            <img src={image.source} alt={image.alt} />
                        </Thumb>
                        )}
                    </Item>
                    ))}
                </Grid>
            );
      }
  };

  return (
    <Gallery options={{
        initialZoomLevel: 'fit',
        secondaryZoomLevel: 'fit',
        maxZoomLevel: 'fit',
        allowPanToNext: true,
        pinchToClose: false,
        doubleTapAction: false,
        wheelToZoom: false,
        zoom:false,
        zoomAnimationDuration:0
    }}>
      {renderLayout()}
    </Gallery>
  );

};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0px;
`;

const Thumb = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.25s ease;
  }

  &:hover img {
    transform: scale(1.03);
  }
`;

const SlideContainer = styled.div`
    display: flex;
    overflow-x: auto;
    gap: 10px;
    padding: 10px 0;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
`;

const SlideImg = styled.img`
    height: 300px;
    width: auto;
    border-radius: 8px;
    cursor: pointer;
`;

const ScrollContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ScrollImg = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
    cursor: pointer;
`;



export default PhotoGallery;
