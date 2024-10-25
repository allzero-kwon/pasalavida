import styled from "@emotion/styled";
import data from "data.json";
import Host from "../Contact/Host.tsx";
// import RoundButton from "@/components/RoundButton.tsx";
import { Paragraph } from "@/components/Text.tsx";
import * as qs from "qs";

const Invitation = () => {
  const { greeting } = data;
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
    // 문자열 맨 앞의 ?를 생력
  });
  const pageType = query.t;

  return (
    <InvitationWrapper>
      <Paragraph>
        {pageType === "h1"
          ? greeting.message_h
          : pageType === "h2"
          ? greeting.message_y
          : greeting.message}
      </Paragraph>
      <Host />
    </InvitationWrapper>
  );
};

export default Invitation;

const InvitationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
