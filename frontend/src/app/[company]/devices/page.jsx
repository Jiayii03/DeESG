"use client";

import { useState } from "react";
import { Leaf, Battery, Coins } from "lucide-react";
import { useParams } from "next/navigation";
import DeviceCard from "./DeviceCard";
import DeviceData from "./DeviceData";

const Home = () => {
  return (
    <main className="flex p-8 pt-0 gap-3">
      <div className="basis-4/12">
        <DeviceCard />
      </div>
      <div className="basis-8/12">
        <DeviceData />
      </div>
    </main>
  );
};

export default Home;
