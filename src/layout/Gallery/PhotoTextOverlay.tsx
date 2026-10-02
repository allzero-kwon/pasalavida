// PhotoTextOverlay.tsx
import styled from "@emotion/styled";

type Align = "left" | "center" | "right";

export interface OverlayText {
  text: string;
  /** 위치: 퍼센트로 (0~100) */
  xPct?: number; // left 기준
  yPct?: number; // top 기준
  anchor?: "left" | "right";
  /** 정렬 */
  align?: Align;
  /** 폰트 */
  fontFamily?: string;
  fontSizeClamp?: string; // e.g. "clamp(18px, 3.2vw, 34px)"
  lineHeight?: number;
  letterSpacing?: string;
  /** 스타일 */
  color?: string;
  shadow?: string;
  rotateDeg?: number;
  /** 배경(필요하면) */
  bg?: string; // e.g. "rgba(0,0,0,0.25)"
  padding?: string; // e.g. "10px 12px"
  borderRadius?: string; // e.g. "12px"
  /** max width */
  maxWidthPct?: number; // e.g. 80
}

interface Props {
  src: string;
  alt?: string;
  /** 이미지 비율 고정(예: 720x1080 => 2/3) */
  aspectRatio?: string; // "2 / 3"
  /** 오버레이 텍스트들 */
  overlays: OverlayText[];
  /** 이미지 fit */
  objectFit?: "cover" | "contain";
  /** 모서리 */
  radius?: number;
}

const Wrap = styled.div<{
  $ratio?: string;
  $radius: number;
  $hasOverlayText: boolean;
}>`
  position: relative;
  width: 100%;
  overflow: visible;
  border-radius: ${({ $radius }) => $radius}px;

  /* aspect-ratio fallback: padding-top trick */
  ${({ $ratio, $hasOverlayText }) => {
    if (!$ratio) return "";
    // Parse "width / height" or "width/height"
    const parts = $ratio.split("/").map((p) => parseFloat(p.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      const percentage = $hasOverlayText ? (parts[1] / parts[0]) * 100 : 100;
      return `
        &::before {
          content: "";
          display: block;
          padding-top: ${percentage}%;
        }
      `;
    }
    return "";
  }}
`;

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: visible;
`;

const Img = styled.img<{ $fit: "cover" | "contain" }>` 
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  object-fit: ${({ $fit }) => $fit};
`;

const Text = styled.div<{
  $x: number;
  $y: number;
  $anchor: "left" | "right";
  $align: Align;
  $fontFamily?: string;
  $fontSize: string;
  $lineHeight: number;
  $letterSpacing?: string;
  $color: string;
  $shadow?: string;
  $rotate: number;
  $bg?: string;
  $padding?: string;
  $radius?: string;
  $maxWidthPct?: number;
}>`
  position: absolute;
  z-index: 20;
  ${({ $anchor, $x }) =>
    $anchor == "left" ? `left: ${$x}%;` : `right: ${$x}%;`};
  top: ${({ $y }) => $y}%;

  transform: translateY(-50%) rotate(${({ $rotate }) => $rotate}deg);

  text-align: ${({ $align }) => $align};
  white-space: pre-line;

  font-family: ${({ $fontFamily }) => $fontFamily || "inherit"};
  font-size: ${({ $fontSize }) => $fontSize};
  line-height: ${({ $lineHeight }) => $lineHeight};
  letter-spacing: ${({ $letterSpacing }) => $letterSpacing || "normal"};
  color: ${({ $color }) => $color};
  text-shadow: ${({ $shadow }) => $shadow || "none"};

  background: ${({ $bg }) => $bg || "transparent"};
  padding: ${({ $padding }) => $padding || "0"};
  border-radius: ${({ $radius }) => $radius || "0"};

  ${({ $maxWidthPct }) =>
    $maxWidthPct
      ? `
    max-width: ${$maxWidthPct}%;
  `
      : ""}
`;

export default function PhotoTextOverlay({
  src,
  alt = "",
  aspectRatio,
  overlays,
  objectFit = "cover",
  radius = 0,
}: Props) {
  const hasOverlayText = overlays.some((o) => o.text && o.text.trim() !== "");

  return (
    <Wrap
      $ratio={aspectRatio}
      $radius={radius}
      $hasOverlayText={hasOverlayText}
    >
      <Inner>
        <Img src={src} alt={alt} $fit={objectFit} />
        {overlays.map((o, i) => (
          <Text
            key={i}
            $x={o.xPct ?? 50}
            $y={o.yPct ?? 15}
            $anchor={o.anchor ?? "left"}
            $align={o.align ?? "center"}
            $fontFamily={o.fontFamily}
            $fontSize={o.fontSizeClamp ?? "clamp(18px, 3.4vw, 34px)"}
            $lineHeight={o.lineHeight ?? 1.25}
            $letterSpacing={o.letterSpacing}
            $color={o.color ?? "#ffffff"}
            $shadow={o.shadow ?? "0 2px 10px rgba(0,0,0,0.45)"}
            $rotate={o.rotateDeg ?? 0}
            $bg={o.bg}
            $padding={o.padding}
            $radius={o.borderRadius}
            $maxWidthPct={o.maxWidthPct}
          >
            {o.text}
          </Text>
        ))}
      </Inner>
    </Wrap>
  );
}
