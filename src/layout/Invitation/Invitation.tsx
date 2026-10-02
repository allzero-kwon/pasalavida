import styled from "@emotion/styled";
import { getInvitationAssetsById } from "../Gallery/Images";

interface InvitationProps {
  id: string;
}

const Invitation = ({ id }: InvitationProps) => {
  const assets = getInvitationAssetsById(id);

  return (
    <InvitationWrapper >
      {assets.icon && (
        <IconImage>
          <img src={assets.icon} alt="icon" />
        </IconImage>
      )}
      {assets.paragraph && (
        <ParagraphImage>
          <img src={assets.paragraph} alt="결혼 인사말" />
        </ParagraphImage>
      )}
    </InvitationWrapper>
  );
};
const IconImage = styled.div`
  margin: 40px auto 10px;
  width: 35%;
  max-width: 35%;

  img {
    width: 90%;
    display: block;
    margin: auto;
  }
`;
const ParagraphImage = styled.div`
  width: 100%;
  max-width: 80%;

  img {
    width: 100%;
    display: block;
  }
`;


export default Invitation;

const InvitationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
`;
