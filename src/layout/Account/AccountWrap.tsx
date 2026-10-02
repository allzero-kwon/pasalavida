import styled from "@emotion/styled";
import Copy from "@/assets/icons/copy.svg?react";
import kakaopay from "@/assets/icons/kakaopay.png?url";
import toss from "@/assets/icons/toss.png?url";
import { useUserData } from "@/context/UserDataContext";

interface IAccountProps {
  name: string;
  relation: string;
  bank: string;
  account: string;
  phone?: string;
  kakaopayAccount?: string;
  tossAccount?: string;
}
const AccountWrap = ({
  name,
  relation,
  bank,
  account,
  phone,
  kakaopayAccount,
  tossAccount,
}: IAccountProps) => {
  const { fontColor, bgColor } = useUserData();
  const handleKakaoContact = () => {
    if (!window.Kakao) {
      alert("카카오 SDK가 로드되지 않았어요.");
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: "text",
      text: `${relation} ${name}\n전화번호: ${phone}`,
      link: {
        mobileWebUrl: window.location.href,
        webUrl: window.location.href,
      },
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(account).then(
      () => {
        alert("계좌번호가 복사되었습니다.");
      },
      () => {
        alert("계좌번호 복사에 실패했습니다.");
      }
    );
  };

  return (
    <Wrapper>
      <Info>
        <Relation style={{ color: fontColor, opacity: 0.8 }}>{relation}</Relation>
        <Name style={{ color: fontColor }}>{name}</Name>
      </Info>
      <Details>
        <AccountInfo style={{ color: fontColor }}>
          {bank} {account}
        </AccountInfo>
        <CopyButton style={{ backgroundColor: bgColor }} onClick={handleCopy}>
          <Copy fill={fontColor} />
        </CopyButton>
        {phone && (
          <KakaoContactButton onClick={handleKakaoContact}>
            카카오톡 연락
          </KakaoContactButton>
        )}
      </Details>
      <AccountLinks>
        {kakaopayAccount && (
          <AccountButton
            href={kakaopayAccount}
            target="_blank"
            rel="noreferrer"
          >
            <KakaopayImg src={kakaopay} alt="kakaopay" />
          </AccountButton>
        )}
        {tossAccount && (
          <AccountButton href={tossAccount} target="_blank" rel="noreferrer">
            <TossImg src={toss} alt="toss" />
          </AccountButton>
        )}
      </AccountLinks>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #dfdfdf;
  &:last-of-type {
    margin-bottom: 0;
    border-bottom: none;
  }
  display: flex;
  flex-direction: column;
`;

const Info = styled.div`
  height: inherit;
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 5px 0;
`;
const Relation = styled.span`
`;
const Name = styled.span`
  font-size: 1rem;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AccountInfo = styled.div`
`;
const CopyButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 0.1em 0.2em;
  cursor: pointer;
  gap: 2px;
  outline: none;
  box-shadow: none;
  background: white;
`;

const AccountLinks = styled.div`
  display: flex;
  width: 100%;
  gap: 2px;
`;

const AccountButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
  margin: 5px 0;
  padding: 0 0.8em;
  width: inherit;
  font-size: 0.7rem;
  cursor: pointer;
  gap: 2px;
  color: #1a1a1a;
  text-decoration: none;
  outline: none;
  box-shadow: none;
  background: white;
`.withComponent("a");

const KakaopayImg = styled.img`
  width: 50px;
`;

const TossImg = styled.img`
  width: 70px;
`;

const KakaoContactButton = styled.button`
  border: 1px solid #dfdfdf;
  background: #fee500;
  color: #3c1e1e;
  font-size: 0.7rem;
  border-radius: 5px;
  padding: 0.2em 0.4em;
  cursor: pointer;
`;

export default AccountWrap;
