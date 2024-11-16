"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import styles from "../styles/style.module.scss";
import { Check } from "lucide-react";
import { problems } from "../../../../../../../GreenesisLandingPage/GreenesisLandingPage/src/app/data";
import Card from "./Cards";

const AnimatedText = ({ text, progress, delay = 0 }) => {
  const words = text.split(" ");
  return (
    <span className="inline-block">
      {words.map((word, i) => {
        const start = (i / words.length) * 0.5 + delay;
        const end = start + 0.5 / words.length;
        return (
          <Word key={i} progress={progress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </span>
  );
};

const Word = ({ children, progress, range }) => {
  const amount = range[1] - range[0];
  const step = amount / children.length;

  return (
    <span className="inline-block mx-1">
      {children.split("").map((char, i) => {
        const start = range[0] + i * step;
        const end = range[0] + (i + 1) * step;
        return (
          <Char key={`c_${i}`} progress={progress} range={[start, end]}>
            {char}
          </Char>
        );
      })}
    </span>
  );
};

const Char = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0">{children}</span>
      <motion.span className="absolute left-0" style={{ opacity }}>
        {children}
      </motion.span>
    </span>
  );
};

const InfoCard = ({ number, title, description }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [200, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div className="bg-white font-sans rounded-xl p-8 md:p-16 shadow-lg relative min-h-[300px] md:min-h-[360px] w-full flex flex-col">
      <div className="flex items-center gap-4 mb-4 ">
        <div className="bg-green-600 rounded-full p-1">
          <Check className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-2xl font-medium z-[99]">{title}</h3>
      </div>

      <span className="text-gray-100 text-9xl absolute top-8 right-8 font-mono z-10">
        {number.toString().padStart(2, "0")}
      </span>

      <p className="text-gray-600 text-base md:text-lg leading-relaxed z-[99]">
        {description}
      </p>

      <div className="align-left absolute bottom-4 right-4 w-[100px] h-[100px] bg-black"></div>
    </div>
  );
};

export default function InfoSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "start 0.4"],
  });

  return (
    <section className="pt-32 pb-20 bg-white">
      <div ref={container} className="max-w-[90rem] mx-auto px-4 mb-32">
        <div className="text-center mb-32">
          <h1 className="text-[8rem] font-bold mb-12 leading-tight tracking-tight">
            <AnimatedText text="Introducing" progress={scrollYProgress} />{" "}
            <span className="text-green-600">
              <AnimatedText
                text="DeESG"
                progress={scrollYProgress}
                delay={0.25}
              />
            </span>
          </h1>
          <div className="text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            <AnimatedText
              text="Bolster transparency and empower sustainable business practices with decentralized ESG rating."
              progress={scrollYProgress}
              delay={0.4}
            />
          </div>
          <div className="h-[20vh]" />
        </div>
      </div>
    </section>
  );
}
