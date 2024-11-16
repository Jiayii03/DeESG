"use client";

import React from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { MoveLeft, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();

  const companySizes = [
    { value: "1-10", label: "1-10 employees" },
    { value: "11-50", label: "11-50 employees" },
    { value: "51-100", label: "51-100 employees" },
    { value: "101-500", label: "101-500 employees" },
    { value: "501-1000", label: "501-1000 employees" },
    { value: ">1000", label: ">1000 employees" },
  ];

  const regions = [
    { value: "north-america", label: "North America" },
    { value: "europe", label: "Europe" },
    { value: "asia", label: "Asia" },
    { value: "south-america", label: "South America" },
    { value: "africa", label: "Africa" },
    { value: "australia", label: "Australia" },
  ];

  const sectors = [
    { value: "technology", label: "Technology" },
    { value: "finance", label: "Finance" },
    { value: "healthcare", label: "Healthcare" },
    { value: "energy", label: "Energy" },
    { value: "retail", label: "Retail" },
    { value: "manufacturing", label: "Manufacturing" },
  ];

  return (
    <div className="flex gap-3">
      <div className="basis-3/12"></div>
      <div className="basis-6/12">
        <div className="flex flex-col items-start gap-2">
          <Button
            className="bg-transparent mb-5"
            startContent={<MoveLeft size={16} />}
            onPress={() => router.push("/explore")}
          >
            <span>Back</span>
          </Button>
          <h1 className="text-5xl">Get Started</h1>
          <h2 className="text-lg text-gray-400">Add your company</h2>
        </div>

        <div className="flex mt-5 justify-between">
          <Input
            isRequired
            type="text"
            label="Company Name"
            variant="underlined"
            className="max-w-xs"
          />
          <Input
            isRequired
            type="text"
            label="Twitter Handle"
            variant="underlined"
            className="max-w-xs"
          />
        </div>

        <div className="flex justify-between mt-10">
          <Input
            isRequired
            type="text"
            label="Company Website"
            variant="underlined"
            className="max-w-xs"
          />

          <Autocomplete
            label="Select sector"
            className="max-w-xs"
            variant="underlined"
            isRequired
          >
            {sectors.map((sector) => (
              <AutocompleteItem key={sector.value} value={sector.value}>
                {sector.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>

        <div className="flex justify-end items-center mt-10">
          <Button endContent={<MoveRight size={16} />} onPress={() => router.push("/company")}>
            <span>Submit</span>
          </Button>
        </div>
      </div>
      <div className="basis-3/12"></div>
    </div>
  );
}

export default page;
