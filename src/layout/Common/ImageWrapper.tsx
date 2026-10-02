import styled from "@emotion/styled";

// const ImageWaveWarpper = styled.div`

//     <div className="wwave">
//       <svg
//         className="waves"
//         xmlns="http://www.w3.org/2000/svg"
//         xmlnsXlink="http://www.w3.org/1999/xlink"
//         viewBox="0 24 150 28"
//         preserveAspectRatio="none"
//         shapeRendering="auto"
//       >
//         <defs>
//           <path
//             id="gentle-wave"
//             d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
//           />
//         </defs>
//         <g className="parallax">
//           <use
//             xlinkHref="#gentle-wave"
//             x="58"
//             y="0"
//             fill="rgba(255,255,255,0.7"
//           />
//           <use
//             xlinkHref="#gentle-wave"
//             x="58"
//             y="3"
//             fill="rgba(255,255,255,0.5)"
//           />
//           <use
//             xlinkHref="#gentle-wave"
//             x="58"
//             y="5"
//             fill="rgba(255,255,255,0.3)"
//           />
//           <use xlinkHref="#gentle-wave" x="58" y="7" fill="#fff" />
//         </g>
//       </svg>
//     </div> 
// `

const ImageGradientWrapper = styled.div<{bgColor:string, fontColor:string}>`
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    display: block;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    height: 30px;

    background: linear-gradient(
      to bottom,
      #00000000 0%,
      ${props => props.bgColor} 100%
    );

    pointer-events: none;
  }
`;

export const TopImageGradientWrapper = styled.div<{bgColor:string, fontColor:string}>`
  position: relative;
  overflow: visible;

  img {
    width: 100%;
    display: block;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
    height: 150px;

    background: linear-gradient(
      to top,
      #00000000 0%,
      ${props => props.bgColor} 100%
    );

    pointer-events: none;
  }
`;

export default ImageGradientWrapper;