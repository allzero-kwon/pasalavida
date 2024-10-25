import styled from "@emotion/styled";

const Container = styled.div`
  /*border-image-source: url('/background.png');  이미지 경로 설정 */
  border-image-slice: 30% 49%; /* 이미지의 크기 설정 */
  color: black;
  background-color: #fff;
  width: 100vw;
  margin: 0 auto;

  @media screen and (min-width: 500px) {
  }
`;
export default Container;
