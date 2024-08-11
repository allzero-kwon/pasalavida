import { NavermapsProvider } from "react-naver-maps";
import { useState } from "react";
import SimpleLayout from "@/layout/Layouts/Simple";
import introvideo from "@/assets/videos/landing1.mp4";
import styled from "styled-components";

/* eslint-disable @typescript-eslint/no-unused-vars */
const IndexPage = () => {
  const ncpClientId = "txdfzgbrtu";
  const [isLoading, setLoading] = useState(true);

  return (
    <NavermapsProvider ncpClientId={ncpClientId}>
      {isLoading ? (
        <VideoContainer
          muted
          autoPlay
          playsInline
          controls={false}
          onEnded={() => setLoading(false)}
          onClick={() => setLoading(false)}
        >
          <source src={introvideo} type="video/mp4"></source>
        </VideoContainer>
      ) : (
        <SimpleLayout />
      )}
    </NavermapsProvider>
  );
};
export default IndexPage;

const VideoContainer = styled.video`
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  position: "relative";
`;
