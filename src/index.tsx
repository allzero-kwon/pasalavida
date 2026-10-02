import { NavermapsProvider } from "react-naver-maps";
import SimpleLayout from "@/layout/Layouts/Simple";
import rawData from "data.json"
import { useParams } from "react-router-dom";
import { IData } from "./types/data";
import Splash from "@/components/Splash";
import { UserDataProvider } from "@/context/UserDataContext";
import { HelmetProvider } from "react-helmet-async";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Snowfall } from 'react-snowfall'
import petal from '@/assets/icons/petal3.png'

const IndexPage = () => {
  const db: Record<string, IData> = rawData;
  const ncpClientId = "xhxksvdr5n";
  const { pageId } = useParams();
  if (!pageId || !db) {
    return <div>존재하지 않는 페이지입니다.</div>;
  }
  const data = db[pageId];
  const [splashVisible, setSplashVisible] = useState(true);
  const [startFadeOut, setStartFadeOut] = useState(false);
  const petal1 = document.createElement('img')
  petal1.src = petal
  petal1.width = 512
  const images = [petal1];

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setStartFadeOut(true);           // fade out animation 시작
    }, 3000); // 2초간 유지

    const fullTimer = setTimeout(() => {
      setSplashVisible(false);         // splash 완전히 제거
    }, 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(fullTimer);
    };
  }, []);

  useEffect(() => {
    if (splashVisible) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";   
      document.body.style.width = "100%";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.touchAction = "";
      window.scrollTo({ top: 0 });

    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.touchAction = "";
    };
  }, [splashVisible]);



  return (

    <NavermapsProvider ncpClientId={ncpClientId}>
      <HelmetProvider>
        <UserDataProvider id={pageId}>
          <Helmet>
            <title>{data.main?.title || "우리 결혼해요"}</title>
            <meta property="og:title" content={data.main?.title} />
            <meta name="description" content={data.main?.eventDetail || "초대합니다"} />
            <meta property="og:image" content={`https://luvisall.site/${pageId}/main/main.jpeg`} />
            <meta property="og:url" content={`https://luvisall.site/${pageId}`} />
          </Helmet>
          <Snowfall color="white" 
                  speed={[0,0.1]}
                  wind={[-1,-0.5]}
                  images={images}
                  style={{
                    position: "fixed",
                    width: "100vw",
                    height: "100vh",
                    zIndex: 99, 
                    pointerEvents: "none",
                  }} 
                  snowflakeCount={60}/>

          <>
            {data.splashColor && splashVisible ? <Splash
              id={pageId}
              title={data.main?.title || ""}
              date={data.main?.date}
              eventDetail={data.main?.eventDetail}
              fadeOut={startFadeOut}
              mainColor={data.splashColor}
              splashMode={data.splashMode || "default"}
            /> : <></>}

            <LayoutContainer>
              <SimpleLayout id={pageId} data={data} />
            </LayoutContainer>
          </>
        </UserDataProvider>
      </HelmetProvider>
    </NavermapsProvider>
  );
};
export default IndexPage;

const LayoutContainer = styled.div`
  flex: auto;
  flex-direction: column;
  justify-items: center;
  min-height: 100vh;
  align-items: center;
  width: 100vw;
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
`;