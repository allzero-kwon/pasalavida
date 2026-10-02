import { useRef, useState } from "react";
import styled from "@emotion/styled";
import { getVideoThumbnailById } from "./Images";

type VideoState = "idle" | "playing";

const VideoGallery = ({ id, videoSrc }: { id: string, videoSrc: string|undefined }) => {
  const [state, setState] = useState<VideoState>("idle");
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  // const timerRef = useRef<number | null>(null);

  const thumb = getVideoThumbnailById(id);

  // /** 👀 화면 진입 감지 → 3초 뒤 자동 재생 */
  // useEffect(() => {
  //   if (!wrapperRef.current) return;

  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting && state === "idle") {
  //         timerRef.current = window.setTimeout(() => {
  //           setState("playing");
  //         }, 5000);
  //       } else {
  //         if (timerRef.current) {
  //           clearTimeout(timerRef.current);
  //           timerRef.current = null;
  //         }
  //       }
  //     },
  //     { threshold: 0.6 }
  //   );

  //   observer.observe(wrapperRef.current);
  //   return () => observer.disconnect();
  // }, [state]);

  if (!thumb || !videoSrc) return null;

  return (
    <Wrap ref={wrapperRef}>
      <CamcorderFrame>
        <Inner>
          {state === "idle" ? (
            <Thumb onClick={() => setState("playing")}>
              <img src={thumb.source} alt="thumbnail" />
              <PlayButton />
            </Thumb>
          ) : (
            <Iframe
              key={state}
              src={`https://www.youtube.com/embed/${videoSrc}?autoplay=1&rel=0&controls=1&modestbranding=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
        </Inner>
      </CamcorderFrame>
    </Wrap>
  );
};

export default VideoGallery; 
const Wrap = styled.div`
  margin: 54px 0 56px;
`;

const CamcorderFrame = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  background: #000;
  padding: 6px;
  border-radius: 18px;
  overflow: hidden;

  /* 16:9 Aspect Ratio Fallback (9 / 16 = 56.25%) */
  &::before {
    content: "";
    display: block;
    padding-top: 56.25%;
  }
`;

const Inner = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  right: 6px;
  bottom: 6px;
  border-radius: 12px;
  overflow: hidden;
`;

const Thumb = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;

  img {
    margin: 0 auto;
    width: 70%;
    height: auto;
    object-fit: cover;
  }
`;

const PlayButton = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  width: 52px;
  height: 52px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: rgba(0,0,0,0.6);

  &:before {
    content: "";
    position: absolute;
    left: 21px;
    top: 14px;
    border-style: solid;
    border-width: 10px 0 10px 14px;
    border-color: transparent transparent transparent white;
  }
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;
