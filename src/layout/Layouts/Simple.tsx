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
import { IData } from "@/types/data";
import { useUserData } from "@/context/UserDataContext";
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Calendar from "../Calendar/Calendar";
import WeddingEnvelope from "../Invitation/WeddingEnvelope";
import Host from "../Contact/Host";
import VideoGallery from "../Gallery/VideoGallery";
import Guestbook from "../Guestbook/Guestbook";
import GuestbookPhotoOverlay from "../Guestbook/GuestbookPhotoOverlay";

interface LayoutProp{
  id: string;
  data : IData
}


const SimpleLayout = ({id, data}: LayoutProp) => {
  const galleryRef = useRef(null);
  const { mainColor, fontColor, bgColor } = useUserData();

  return (
    <Container bgColor={bgColor} fontColor={fontColor} font={data.font || "Gowun Dodum"} >

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          ease: "easeInOut",
          duration: 3,
          y: { duration: 1 },
        }}
      >
        <Wrapper style={{ marginTop: "0px" }}>
          <Main id={id}/>
        </Wrapper>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          ease: "easeInOut",
          duration: 3,
          y: { duration: 1 },
        }}
        style={{ marginTop: "40px" }}
      >
        <Wrapper>
          <Heading1 color={mainColor}/> 
          <Invitation id={id}/>
        </Wrapper>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          ease: "easeInOut",
          duration: 3,
          y: { duration: 1 },
        }}
      >
        <Wrapper> 
          <WeddingEnvelope id={id} />
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
          <Host groom={data.main.host.groom} bride={data.main.host.bride}/>
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
          <VideoGallery id={id} videoSrc={data.videoSrc} />
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
        <Wrapper ref={galleryRef}  style={{ marginBottom: "0px" }}>
          {/* <Heading1 color={mainColor}>Gallery</Heading1> */}
          <GalleryWrap/> 
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
        <Wrapper style={{ marginTop: "0px" }}>
          <Calendar id={id} date={data.date} color={data.subColor} fontColor={fontColor} />
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
          <Heading1 style={{marginBottom: "15px"}} color={mainColor}>Location</Heading1>
          <Location mapInfo={data.mapInfo}/>
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
          <Heading1 color={mainColor}>마음 전하실 곳</Heading1>
          <Account id={id} hostInfo={data.hostInfo}/>
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
          <Heading1 color={mainColor}>신랑 신부에게</Heading1>
          <GuestbookPhotoOverlay id={id} />
          <Guestbook id={id}/>
        </Wrapper>
      </motion.div>
    </Container>
  );
};

export default SimpleLayout;
