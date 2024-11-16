"use client";
import LogoSection from "../components/logoSection";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function Home() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      duration: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <main ref={container} className="relative min-h-[200vh] overflow-hidden">
      <LogoSection />
      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} />
    </main>
  );
}

const Section1 = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [0, -5]);

  return (
    <motion.div style={{ scale, rotate }} className="sticky top-0 h-screen">
      <LogoSection />
    </motion.div>
  );
};

const Section2 = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0.5, 1], [0.85, 1]);
  const rotate = useTransform(scrollYProgress, [0.5, 1], [-5, 0]);

  return (
    <motion.div style={{ scale, rotate }} className="relative h-screen">
      {/* Add your second section content here */}
    </motion.div>
  );
};
