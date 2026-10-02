import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import styled from "@emotion/styled";
import { onValue, ref } from "firebase/database";
import { realtimeDb } from "@/firebase";

/* ================= types ================= */

interface GuestbookItem {
    id: string;
    name: string;
    message: string;
    createdAt: number;
}

type Position = {
    top: string;
    bottom?: string;
    left?: string;
    right?: string;
    rotate: string;
    maxWidth?: string;
};

/* ================= layout presets ================= */

const NOTE_POSITIONS: Record<number, Position[]> = {
    1: [{ top: "8%", left: "14%", rotate: "-8deg", maxWidth: "80%" }],
    2: [
        { top: "14%", left: "14%", rotate: "-6deg" },
        { top: "48%", right: "14%", rotate: "6deg" },
    ],
    3: [
        { top: "10%", left: "12%", rotate: "-8deg" },
        { top: "40%", right: "12%", rotate: "6deg" },
        { top: "75%", left: "28%", rotate: "3deg" },
    ],
    4: [
        { top: "8%", left: "4%", rotate: "-8deg" },
        { top: "26%", right: "4%", rotate: "6deg" },
        { top: "48%", left: "4%", rotate: "4deg" },
        { top: "78%", right: "4%", rotate: "-6deg" },
    ],
    5: [
        { top: "8%", left: "4%", rotate: "-8deg" },
        { top: "26%", right: "6%", rotate: "6deg" },
        { top: "45%", left: "6%", rotate: "4deg" },
        { top: "60%", right: "2%", rotate: "-6deg" },
        { top: "90%", left: "28%", rotate: "3deg" },
    ],
};

/* ================= utils ================= */

const MAX_PAGE_LENGTH = 180;
const MAX_ITEMS_PER_PAGE = 5;

function splitMessagesIntoPages(items: GuestbookItem[]) {
    const pages: GuestbookItem[][] = [];
    let current: GuestbookItem[] = [];
    let lengthSum = 0;

    for (const item of items) {
        const len = item.message.length;

        if (
            current.length >= MAX_ITEMS_PER_PAGE ||
            lengthSum + len > MAX_PAGE_LENGTH
        ) {
            pages.push(current);
            current = [];
            lengthSum = 0;
        }

        current.push(item);
        lengthSum += len;
    }

    if (current.length > 0) pages.push(current);

    return pages;
}

/* ================= component ================= */

const GuestbookPhotoOverlay = ({ id }: { id: string }) => {
    const [messages, setMessages] = useState<GuestbookItem[]>([]);
    const [[page, direction], setPage] = useState([0, 0]);
    const background = getGuestbookMediaById(id);

    useEffect(() => {
        const guestbookRef = ref(realtimeDb, `guestbook/${id}`);

        return onValue(guestbookRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) return;

            const list: GuestbookItem[] = Object.entries(data)
                .map(([id, value]: any) => ({ id, ...value }))
                .filter((v) => v.message)
                .sort((a, b) => b.createdAt - a.createdAt);

            setMessages(list);
            setPage([0, 0]);
        });
    }, []);

    const pages = useMemo(() => splitMessagesIntoPages(messages), [messages]);

    const totalPages = pages.length;
    const currentItems = pages[page] ?? [];

    const positions =
        NOTE_POSITIONS[currentItems.length] ??
        NOTE_POSITIONS[5].slice(0, currentItems.length);
        

    const paginate = useCallback(
        (newDirection: number) => {
            const nextPage = page + newDirection;
            if (nextPage >= 0 && nextPage < totalPages) {
                setPage([nextPage, newDirection]);
            }
        },
        [page, totalPages]
    );

    const onDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const swipeThreshold = 50;
        const { offset, velocity } = info;

        if (offset.x < -swipeThreshold || velocity.x < -0.5) {
            paginate(1);
        } else if (offset.x > swipeThreshold || velocity.x > 0.5) {
            paginate(-1);
        }
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    return (
        <Wrapper>
            {background && <Background src={background} />}

            <Overlay>
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <Page
                        key={page}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={onDragEnd}
                    >
                        {currentItems.map((item, i) => {
                            const pos = positions[i]; 
                            if (!pos) return null;

                            return (
                                <OverlayNote
                                    key={item.id}
                                    style={{
                                        ...pos,
                                        transform: `rotate(${pos.rotate})`,
                                    }}
                                >
                                    <Message>{item.message}</Message>
                                    <Name>- {item.name} -</Name>
                                </OverlayNote>
                            );
                        })}
                    </Page>
                </AnimatePresence>
            </Overlay>

            {totalPages > 1 && (
                <Dots>
                    {pages.map((_, i) => (
                        <Dot
                            key={i}
                            active={i === page}
                            onClick={() => setPage([i, i > page ? 1 : -1])}
                        />
                    ))}
                </Dots>
            )}
        </Wrapper>
    );
};

export default GuestbookPhotoOverlay;

/* ================= media loader ================= */

export const getGuestbookMediaById = (id: string): string | undefined => {
    const modules = import.meta.glob(
        "/src/assets/*/guestbook/*.{jpg,jpeg,png}",
        { eager: true }
    );

    for (const [path, mod] of Object.entries(modules)) {
        if (
            path.includes(`/assets/${id}/guestbook/`) &&
            path.includes("overlay_photo")
        ) {
            return (mod as { default: string }).default;
        }
    }
};

/* ================= styles ================= */

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Background = styled.img`
  width: 100%;
  display: block;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  top: 2%;
  left: 2%;
  right: 2%;
  bottom: 30%; 
`;

const Page = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const OverlayNote = styled.div`
  position: absolute;
  max-width: 45%;

  color: #fff;
  font-family: "SSFaithfulness";
  font-size: 1.1rem;
  line-height: 1.5;

  white-space: pre-line;
    word-break: keep-all;
    overflow-wrap: break-word;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
`;

const Message = styled.div`
  margin-bottom: 0px;
`;

const Name = styled.div`
  text-align: right;
  padding-right: 15%;
  opacity: 0.9;
`;

const Dots = styled.div`
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ active }) =>
        active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)"};
  cursor: pointer;
  transition: background 0.25s ease;
`;
