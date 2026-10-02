import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { onValue, ref } from "firebase/database";
import { realtimeDb } from "@/firebase";

interface GuestbookItem {
  id: string;
  name: string;
  message: string;
  createdAt: number;
}

const GuestbookList = () => {
  const [items, setItems] = useState<GuestbookItem[]>([]);

  useEffect(() => {
    const guestbookRef = ref(realtimeDb, "guestbook");

    return onValue(guestbookRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setItems([]);
        return;
      }

      const parsed = Object.entries(data).map(([id, value]: any) => ({
        id,
        ...value,
      }));

      parsed.sort((a, b) => b.createdAt - a.createdAt);
      setItems(parsed);
    });
  }, []);

  return (
    <List>
      {items.map((item) => (
        <Item key={item.id}>
          <Name>{item.name}</Name>
          <Message>{item.message}</Message>
        </Item>
      ))}
    </List>
  );
};

export default GuestbookList;
const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Item = styled.div`
  padding: 12px;
  border-radius: 8px;
  background: #fafafa;
  border: 1px solid #eee;
`;

const Name = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const Message = styled.div`
  font-size: 0.9rem;
`;
