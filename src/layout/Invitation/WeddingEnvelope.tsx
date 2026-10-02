import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

type EnvelopeState = "start" | "playing" | "ended";

interface WeddingEnvelopeProps {
  id: string;
}

export interface InvitationMedia {
  startImage?: string;
  gif?: string;
  endImage?: string;
}

const WeddingEnvelope = ({ id }: WeddingEnvelopeProps) => {
  const { startImage, endImage, gif } = getInvitationMediaById(id);
  const [state, setState] = useState<EnvelopeState>("start");
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = typeof IntersectionObserver !== 'undefined' 
      ? new IntersectionObserver(
          ([entry]) => {
            if (
              entry.isIntersecting &&
              entry.intersectionRatio >= 1.0 &&
              state === "start"
            ) {
              if (!gif && !endImage) return;

              const timer = setTimeout(() => {
                setState(gif ? "playing" : "ended");
                observer?.disconnect();
              }, 1400);
              return () => clearTimeout(timer);
            }
          },
          {
            threshold: [1.0],
          }
        )
      : null;

    if (observer) {
      observer.observe(wrapperRef.current);
    } else {
      // Fallback for browsers without IntersectionObserver (e.g. older iOS)
      if (gif || endImage) {
        const timer = setTimeout(() => setState(gif ? "playing" : "ended"), 1500);
        return () => clearTimeout(timer);
      }
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [state]);



  useEffect(() => {
    console.log('state changed ', state)
    if (state === "playing") {
      if (!endImage) return; 

      const timer = setTimeout(() => {
        setState("ended");
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [state, endImage]);

  return (
    <Wrapper ref={wrapperRef}>
      <Inner>
        {state === "start" && (
          <EnvelopeImage
            src={startImage}
            animate={{
              opacity: 1,
              scale: [1, 1.035, 1],
            }}
            transition={{
              duration: 2.6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        )}

        <AnimatePresence mode="sync">
          {state === "playing" && (
            <EnvelopeImage
              key="playing"
              src={gif}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}              // 🔥 fade out
              transition={{ duration: 0.8 }}
            />
          )}

          {state === "ended" && (
            <EnvelopeImage
              key="ended"
              src={endImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </Inner>
    </Wrapper>
  );

};

export default WeddingEnvelope;

export const getInvitationMediaById = (id: string): InvitationMedia => {
  const modules = import.meta.glob(
    "/src/assets/*/invitation/*.{jpg,jpeg,png,gif}",
    { eager: true }
  );

  let startImage, endImage, gif;

  Object.entries(modules)
    .filter(([path]) => path.includes(`/assets/${id}/invitation/`))
    .forEach(([path, mod]) => {
      const src = (mod as any).default;
      const name = path.split("/").pop()?.toLowerCase();
      if (name?.startsWith("start")) startImage = src;
      else if (name?.startsWith("end")) endImage = src;
      else if (name?.endsWith(".gif")) gif = src;
    });

  return { startImage, endImage, gif };
};

const Wrapper = styled.div`
  position: relative;
  width: 50%;
  margin: 20px 0px 80px;
  cursor: default;
  pointer-events: none;
  
  /* aspect-ratio fallback: padding-top trick (3 / 2 = 66.67%) */
  &::before {
    content: "";
    display: block;
    padding-top: 66.67%;
  }
`;

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const EnvelopeImage = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  overflow-x: hidden;
  cursor: default;
`;
