import Image from "next/image";
import React from "react";
import { Button } from "./ui/button2";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen mt-12 pt-32 py-12 mb-10">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center max-w-6xl">
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
        <div className="h-[10vh]" />
      </main>
    </div>
  );
}
