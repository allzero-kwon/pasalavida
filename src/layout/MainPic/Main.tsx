import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import "./Main.css";
import { getMainImageById } from "../Gallery/Images";
import { useUserData } from "@/context/UserDataContext";
import ImageGradientWrapper from "../Common/ImageWrapper";
import { ref as dbRef, onValue } from "firebase/database";
import { realtimeDb } from "@/firebase";

interface MainProp{
  id: string;
}

interface MainData {
    url: string;
    adjustments: {
        brightness: number;
        contrast: number;
        saturation: number;
        grayscale: number;
        temperature: number;
    };
    hideCover: boolean;
}

const Main = ({id, }: MainProp) => {
  const { fontColor, bgColor } = useUserData();
  const [firebaseData, setFirebaseData] = useState<MainData | null>(null);

  useEffect(() => {
    if (!id) return;
    const mainRef = dbRef(realtimeDb, `galleries/${id}/main`);
    const unsubscribe = onValue(mainRef, (snapshot) => {
      if (snapshot.exists()) {
        setFirebaseData(snapshot.val());
      }
    });
    return () => unsubscribe();
  }, [id]);

  const myImage = getMainImageById(id);
  const defaultImage = getMainImageById(id);
  const staticImageSource = myImage.length > 0 ? myImage[0].source : (defaultImage.length > 0 ? defaultImage[0].source : '');
  
  const imageSource = firebaseData?.url || staticImageSource;

  if (firebaseData?.hideCover) return null;

  const filters = firebaseData?.adjustments ? 
    `brightness(${firebaseData.adjustments.brightness}) contrast(${firebaseData.adjustments.contrast}) saturate(${firebaseData.adjustments.saturation}) grayscale(${firebaseData.adjustments.grayscale})` 
    : "none";

  return (
    <div style={{ width: "100%" }}>
      <div className="container">
        <div
          style={{
            margin: "0 auto",
            overflow: "hidden",
          }}
        >
          <ImageGradientWrapper bgColor={bgColor} fontColor={fontColor}>
            <MainImg src={imageSource} style={{ filter: filters }} />
          </ImageGradientWrapper>
        </div>
      </div>
    </div>
  );
};
export default Main;

const MainImg = styled.img`
  width: 100%;
  object-fit: cover;
`; 
