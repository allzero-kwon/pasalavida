import { useState } from "react";
import styled from "@emotion/styled";
import { push, ref } from "firebase/database";
import { realtimeDb } from "@/firebase";
import { useUserData } from "@/context/UserDataContext";


const GuestbookForm = ({ id }: { id: string }) => {
  const { fontColor, bgColor, mainColor } = useUserData();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const guestbookRef = ref(realtimeDb, `guestbook/${id}`);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) {
      alert("이름과 메시지를 입력해주세요 🙂");
      return;
    }

    push(guestbookRef, {
      name,
      message,
      createdAt: Date.now(),
    });

    setName("");
    setMessage("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <input
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ background: bgColor, color: fontColor, borderColor: fontColor + '33' }}
      />
      <textarea
        placeholder="축하 메시지를 남겨주세요"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ background: bgColor, color: fontColor, borderColor: fontColor + '33' }}
      />
      <button type="submit" style={{ background: mainColor, color: fontColor }}>등록</button>
    </Form>
  );
};

export default GuestbookForm;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;

  input,
  textarea {
    padding: 8px;
    border-radius: 6px;
    font-size: 0.95rem;
    border: solid 0.3px #999999;
  }

  textarea {
    resize: none;
    min-height: 80px;
  }

  button {
    padding: 10px;
    border-radius: 6px;
    border: none;
  }
`;
