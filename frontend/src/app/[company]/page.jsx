"use client";

import Profile from "./profile/page";
import { Button } from "@nextui-org/react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Divider } from "@nextui-org/react";
import DevicesTable from "./profile/DevicesTable";

const Explore = () => {
  const router = useRouter();

  return (
    <main>
      <div className="flex p-8 gap-3">
        <div className="basis-4/12">
          <Profile />
        </div>

        <div className="basis-8/12">
          <div className="flex flex-col justify-start">
            <div className="flex flex-col justify-start gap-10 p-10">
              <div className="flex justify-between">
                <h1 className="text-2xl">ESG Score</h1>
                <Button>Evaluate</Button>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col justify-start gap-10 p-10">
              <div className="flex justify-between">
                <h1 className="text-2xl">Devices</h1>
                <Button>Add</Button>
              </div>
              <DevicesTable />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Explore;
