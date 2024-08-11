import styled from "@emotion/styled";

export const IntroTitle = styled.p`
  font-family: Birds-of-paradise, serif;
  font-size: 3rem;
  color: #000;
  margin: 20px;
  white-space: pre-line;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const Heading1 = styled.p`
  font-family: SunBatang-Light, serif;
  font-size: 1.5rem;
  margin: 10px;
  color: #f78828;
  white-space: pre-line;
`;

export const Heading2 = styled.p`
  font-size: 1rem;
  margin: 10px;
  white-space: pre-line;
`;

export const PointTitle = styled.p`
  font-family: SunBatang-Light, serif;
  line-height: 1;
  margin: 0;
  color: #f78828;
  white-space: pre-line;
`;

export const Paragraph = styled.p`
  line-height: 2.2rem;
  white-space: pre-line;
`;

export const Caption = styled.p<{ textAlign?: string }>`
  font-weight: 200;
  text-align: ${(props) => (props.textAlign ? props.textAlign : "start")};
  white-space: pre-line;
`;
