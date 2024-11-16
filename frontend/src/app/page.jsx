"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import SloganSection from "./components/LandingPage/components/SloganSection";
import CardSection from "./components/LandingPage/components/CardSection";
import FAQSection from "./components/LandingPage/components/FAQSection";
import InfoSection from "./components/LandingPage/components/infoSection";

export default function Home() {
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"], // This means: start animation when the start of the element hits the end of the viewport, end when the end of the element hits the start of the viewport
  });

  // Define animations based on scroll progress
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3, 1], [100, 0, 0]);

  return (
    <main>
      <div className="text-center">
        <section>
          <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen mt-12 pt-32 py-12 mb-10">
            <div className="flex flex-col gap-8 row-start-2 items-center text-center max-w-6xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-space-mono tracking-tight mt-10 ">
                <div className="h-[5vh]" />
                <span className="text-green-600">Explore</span> the Future
                <br />
                of ESG Ratings
              </h1>

              <div className="relative h-[600px] w-[600px]">
                <Image
                  src="/raspberryPI.png"
                  alt="Sustainable Future"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg animate-float"
                />
              </div>
            </div>
          </div>
        </section>

        <motion.section
          className="w-full py-5 pb-2 mt-20"
          style={{
            opacity,
            y,
          }}
        >
          {/* First section with "Deployed on" */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-center text-4xl text-black  --font-space-mono pb-8 mt-[20px]">
              Powered By
            </h2>
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-center items-center gap-16 px-8 pt-8 mb-10">
                <div className="relative group">
                  <Image
                    src="/Greenesis_Techstack/Linea.png"
                    alt="Linea"
                    width={150}
                    height={150}
                    className="object-contain"
                  />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Linea
                  </span>
                </div>
                <div className="relative group">
                  <Image
                    src="/Greenesis_Techstack/Mina2.png"
                    alt="Mina"
                    width={150}
                    height={60}
                  />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Mina
                  </span>
                </div>
                <div className="relative group">
                  <Image
                    src="/Greenesis_Techstack/Scroll.png"
                    alt="Scroll"
                    width={150}
                    height={60}
                  />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Scroll
                  </span>
                </div>
                <div className="relative group">
                  <Image
                    src="/Greenesis_Techstack/zircuit.png"
                    alt="Zircuit"
                    width={150}
                    height={60}
                  />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Zircuit
                  </span>
                </div>
                <div className="relative group">
                  <Image
                    src="/Greenesis_Techstack/Ledger-logo.png"
                    alt="Ledger"
                    width={150}
                    height={60}
                  />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Ledger
                  </span>
                </div>
                <div className="relative group">
                  <Image
                    src="/Greenesis_Techstack/thegraph.png"
                    alt="The Graph"
                    width={150}
                    height={60}
                  />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    The Graph
                  </span>
                </div>
                <div className="relative group">
                  <Image
                    src="/Greenesis_Techstack/chainlink.png"
                    alt="Chainlink"
                    width={150}
                    height={60}
                  />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Chainlink
                  </span>
                </div>
              </div>
            </div>
            <div className="h-[25vh]" />
          </motion.div>
        </motion.section>

        <SloganSection />

        <InfoSection />

        <CardSection />

        <FAQSection />
      </div>
    </main>
  );
}
