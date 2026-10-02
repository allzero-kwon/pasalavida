import styled from "@emotion/styled";
import Button from "@/components/Button.tsx";
import { useUserData } from "@/context/UserDataContext";
interface MapButtonsProps {
  naverMap: string;
}
const MapButtons = ({naverMap}:MapButtonsProps) => {
  const { fontColor } = useUserData();

  return (
    <MapButtonWrapper>
      <Button onClick={() => window.open(naverMap)} color={fontColor}>네이버 지도</Button>
    </MapButtonWrapper>
  );
};

export default MapButtons;

const MapButtonWrapper = styled.div`
  margin: 8px;
  display: flex;
  gap: 8px;
  justify-content: center;
`;
