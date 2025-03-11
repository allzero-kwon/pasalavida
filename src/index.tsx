import { NavermapsProvider } from "react-naver-maps";
// import { useState } from "react";
import SimpleLayout from "@/layout/Layouts/Simple";
// import introvideo from "@/assets/videos/landing1.mp4";
// import introvideo2 from "@/assets/videos/landing2.mp4";

// import styled from "styled-components";
// import * as qs from "qs";

/* eslint-disable @typescript-eslint/no-unused-vars */
const IndexPage = () => {
  const ncpClientId = "txdfzgbrtu";
  // const query = qs.parse(location.search, {
  //   ignoreQueryPrefix: true,
  //   // 문자열 맨 앞의 ?를 생력
  // });
  // const skipType = query.v;
  // const [isLoading, setLoading] = useState(skipType !== "skip");
  // const videos = [introvideo, introvideo, introvideo2];
  // const videoIdx = Math.floor(Math.random() * videos.length);

  return (
    <NavermapsProvider ncpClientId={ncpClientId}>
      {/* {isLoading ? (
        <VideoContainer
          muted
          autoPlay
          playsInline
          controls={false}
          onEnded={() => setLoading(false)}
        >
          <source src={videos[videoIdx]} type="video/mp4"></source>
        </VideoContainer>
      ) : (
        <SimpleLayout />
      )} */}
      <SimpleLayout />
    </NavermapsProvider>
  );
};
export default IndexPage;

// const VideoContainer = styled.video`
//   object-fit: cover;
//   width: 100vw;
//   height: 100vh;
//   position: fixed;
//   top: 0;
//   z-index: 999;
//   left: 0;
//   position: "relative";
// `;
