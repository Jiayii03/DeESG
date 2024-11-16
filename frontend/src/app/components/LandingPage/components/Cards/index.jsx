"use client";
import styles from "./style.module.scss";
import { useTransform, motion, useScroll } from "framer-motion";
import { useRef } from "react";

const Card = ({
  i,
  title,
  description,
  src,
  url,
  color,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={styles.card}
      >
        <div className={styles.indexNumber}>
          {String(i + 1).padStart(2, "0")}
        </div>
        <h2
          className="instrument-sans text-8xl mb-8"
          style={{
            fontFamily: "var(--font-instrument-sans)",
            fontWeight: 700,
            fontSize: "clamp(2rem, 7vw, 7rem)",
          }}
        >
          {title}
        </h2>
        <div className={styles.body}>
          <div className={styles.description}>
            <p>{description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
