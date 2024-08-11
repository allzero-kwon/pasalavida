import styled from "@emotion/styled";
import data from "data.json";
// import MyVideo from '@/assets/videos/myvideo.mp4';
import MyImage from "@/assets/images/00.png";
import "./Main.css";

const Main = () => {
  const { greeting } = data;
  // const videoRef = useRef();
  // const isVideo: boolean = false;

  return (
    <div>
      <div className="container">
        <div
          style={{
            margin: "0 auto",
            overflow: "hidden",
          }}
        >
          <MainImg src={MyImage} />
        </div>
        <div className="wwave">
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shape-rendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.7"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.3)"
              />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>

      <MainTitle>{greeting.title}</MainTitle>
      <SubTitle>{greeting.eventDetail}</SubTitle>
    </div>
  );
};

export default Main;

const MainImg = styled.img`
  /* border-radius: 200px 200px 0 0; */
  width: 100%;
  object-fit: cover;
  /* max-width: 450px; */
`;
// const VideoArch = styled.video`
//   border-radius: 200px 200px 0 0;
//   width: 90%;
//   max-width: 450px;
//   padding-top: 20px;
// `;

// const VideoSqaure = styled.video`
//   width: 80%;
//   max-width: 450px;
//   padding-top: 20px;
// `;

const MainTitle = styled.p`
  font-family: SunBatang-Light, serif;
  font-size: 1.5rem;
  color: #2f2120;
  line-height: 120%;
  white-space: pre-line;
`;

const SubTitle = styled.p`
  font-family: SunBatang-Light, serif;
  font-size: 1.1rem;
  color: #2f2120;
  line-height: 140%;
  white-space: pre-line;
`;
