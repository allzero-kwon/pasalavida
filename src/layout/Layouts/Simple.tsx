import { useRef } from "react";
import { Heading1 } from "@/components/Text.tsx";
import Wrapper from "@/components/Wrapper.tsx";
import Account from "@/layout/Account/Account.tsx";
import Container from "@/layout/Container.tsx";
import GalleryWrap from "@/layout/Gallery/GalleryWrap.tsx";
// import Guestbook from "@/layout/Guestbook/Guestbook.tsx";
import Invitation from "@/layout/Invitation/Invitation.tsx";
import Location from "@/layout/Location/Location.tsx";
import Main from "@/layout/MainPic/Main";
import { motion } from "framer-motion";

const SimpleLayout = () => {
  const galleryRef = useRef(null);

  return (
    <Container>
      <Wrapper style={{ marginTop: "0px" }}>
        <Main />
      </Wrapper>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          ease: "easeInOut",
          duration: 2,
          y: { duration: 1 },
        }}
      >
        <Wrapper>
          <Heading1>
            <br />
            모시는 글
          </Heading1>
          <Invitation />
        </Wrapper>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          ease: "easeInOut",
          duration: 2,
          y: { duration: 1 },
        }}
      >
        <Wrapper ref={galleryRef}>
          <Heading1>Gallery</Heading1>
          <GalleryWrap />
        </Wrapper>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          ease: "easeInOut",
          duration: 2,
          y: { duration: 1 },
        }}
      >
        <Wrapper>
          <Heading1>오시는 길</Heading1>
          <Location />
        </Wrapper>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          ease: "easeInOut",
          duration: 2,
          y: { duration: 1 },
        }}
      >
        <Wrapper>
          <Heading1>마음 전하실 곳</Heading1>
          <Account />
        </Wrapper>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          ease: "easeInOut",
          duration: 2,
          y: { duration: 1 },
        }}
      >
        {/* <Wrapper>
          <Heading1>신랑 신부에게</Heading1>
          <Guestbook />
        </Wrapper> */}
      </motion.div>
    </Container>
  );
};

export default SimpleLayout;
