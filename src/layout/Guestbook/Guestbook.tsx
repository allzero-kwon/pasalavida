import GuestbookForm from "./GuestbookForm";
// import GuestbookList from "./GuestbookList";
import styled from "@emotion/styled";

const Guestbook = ({ id }: { id: string }) => {
  return (
    <Wrapper>
      <GuestbookForm id={id}/>
      {/* <GuestbookList /> */}
    </Wrapper>
  );
};

export default Guestbook;
const Wrapper = styled.div`
  margin: 80px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 80%;
`;
