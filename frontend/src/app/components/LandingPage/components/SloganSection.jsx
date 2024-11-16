"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

export default function SloganSection() {
  const sloganContainer = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sloganContainer,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <section className="overflow-hidden mb-48">
      <div ref={sloganContainer}>
        <Slide
          text="Numbers Don't Lie."
          direction={"left"}
          progress={scrollYProgress}
        />
        <Slide
          text="Neither Do We."
          direction={"right"}
          progress={scrollYProgress}
        />
        <Slide
          text="Pure Data. Real Impact."
          direction={"left"}
          progress={scrollYProgress}
        />
      </div>
      <div className="h-[10vh]" />
    </section>
  );
}

const Slide = ({ text, direction, progress }) => {
  const dir = direction === "left" ? -1 : 1;
  const translateX = useTransform(progress, [0, 1], [150 * dir, -150 * dir]);

  return (
    <motion.div
      style={{ x: translateX }}
      className="relative flex whitespace-nowrap my-8 "
    >
      <SloganPhrase text={text} />
      <SloganPhrase text={text} />
      <SloganPhrase text={text} />
    </motion.div>
  );
};

const SloganPhrase = ({ text }) => {
  const words = text.split(" ");
  return (
    <div className={"px-5 flex gap-5 items-centermy-2"}>
      <p className="text-[5vw] font-bold text-black">
        {words.map((word, index) => (
          <span
            key={index}
            className={
              word === "We" ||
              word === "We." ||
              word === "Numbers" ||
              word === "Data" ||
              word === "Data."
                ? "text-green-500"
                : ""
            }
          >
            {word}{" "}
          </span>
        ))}
      </p>
    </div>
  );
};
