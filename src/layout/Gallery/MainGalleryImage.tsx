// MainGalleryImage.tsx
import styled from "@emotion/styled";
import { getMainGalleryImageById } from "./Images";
import PhotoTextOverlay from "./PhotoTextOverlay";
import { useUserData } from "@/context/UserDataContext";
import { TopImageGradientWrapper } from "../Common/ImageWrapper";

const MainGalleryImage = () => {
  const { id, data, bgColor, fontColor } = useUserData();
  const image = getMainGalleryImageById(id);

  if (!image) return null;

  return (
    <Wrap>
      {/* <img src={image.source} alt={image.alt} /> */}
      <TopImageGradientWrapper bgColor={bgColor} fontColor={fontColor}>
        <PhotoTextOverlay
          src={image.source}
          aspectRatio="2 / 3" // 720x1080 ㅁ같은 세로 포스터면
          overlays={[
            {
              text: data.main.gallery?.message1 || "",
              xPct: data.main.gallery?.x1 ?? 5,          // 좌측 여백
              yPct: data.main.gallery?.y1 || 35,          // 상단 위치
              align: "left",
              fontFamily: data.main.gallery?.font1 || "SSMullaeler", 
              fontSizeClamp: data.main.gallery?.size1 ? `clamp(${data.main.gallery.size1}px, 3.21vw, ${data.main.gallery.size1 - 5}px)` : "clamp(25px, 3.2vw, 20px)",
              lineHeight: 1.15,
              letterSpacing: "0.2px",
              color: data.main.gallery?.color1 || "#ffffff",
            shadow: "0 2px 8px rgba(0,0,0,0.55)",
              rotateDeg: data.main.gallery?.rotate1 ?? -346,
              maxWidthPct: 80,
            },
            {
              text: data.main.gallery?.message2 || "",
              xPct: data.main.gallery?.x2 ?? 5,          // 좌측 여백
              yPct: data.main.gallery?.y2 || 22,          // 상단 위치
              anchor: "right",
              align: "right",
              fontFamily: data.main.gallery?.font2 || "SSVeryBadHandwritingRegular", 
              fontSizeClamp: data.main.gallery?.size2 ? `clamp(${data.main.gallery.size2}px, 3.21vw, ${data.main.gallery.size2 - 4}px)` : "clamp(23px, 3.2vw, 19px)",
              lineHeight: 1.15,
              letterSpacing: "0.2px",
              color: data.main.gallery?.color2 || "#ffffff",
              shadow: "0 2px 8px rgba(0,0,0,0.55)",
              rotateDeg: data.main.gallery?.rotate2 ?? 5,
              maxWidthPct: 80,
            }
          ]}
        />
      </TopImageGradientWrapper>
    </Wrap>
  );
};

export default MainGalleryImage;

const Wrap = styled.div`
  width: 100%;
  margin-top: 80px;

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }
`;
