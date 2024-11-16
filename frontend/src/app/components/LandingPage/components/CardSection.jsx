"use client";

import styles from "./page.module.scss";
import Card from "./Cards";
import { motion, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function Home() {
  const problems = [
    {
      title: "Biased Evaluations",
      titleFont: "var(--font-instrument-sans)", // Add font specification for title
      description:
        "Traditional ESG evaluations often suffer from subjective biases and inconsistent methodologies, leading to unreliable assessments.",
      descriptionFont: "var(--font-space-mono)", // Add font specification for description
      src: "bias.jpg",
      link: "https://example.com/biased-evaluations",
      color: "#2E7D32",
    },
    {
      title: "Data Reliability",
      titleFont: "var(--font-instrument-sans)",
      description:
        "Current ESG reporting lacks standardization and verification, making it difficult to trust the accuracy of environmental impact data.",
      descriptionFont: "var(--font-space-mono)",
      src: "data.jpg",
      link: "https://example.com/data-reliability",
      color: "#66BB6A",
    },
    {
      title: "Lack of Incentives",
      titleFont: "var(--font-instrument-sans)",
      description:
        "Companies have limited motivation to maintain high ESG standards due to insufficient rewards for sustainable practices.",
      descriptionFont: "var(--font-space-mono)",
      src: "incentive.jpg",
      link: "https://example.com/lack-of-incentives",
      color: "#81C784",
    },
  ];

  const cardsContainer = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardsContainer,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <section className="max-w-7xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-6xl font-bold text-center mb-0"
      >
        Problems with Traditional ESG
      </motion.h2>
      <div ref={cardsContainer} className={styles.main}>
        {problems.map((problem, i) => {
          const targetScale = 1 - (problems.length - i) * 0.05;
          return (
            <Card
              key={`p_${i}`}
              i={i}
              {...problem}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
              className="mt-4"
            />
          );
        })}
      </div>
    </section>
  );
}
