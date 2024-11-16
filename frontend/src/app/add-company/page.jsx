"use client";

import React, { useState } from "react";
import {
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { MoveLeft, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi"; // Import wagmi's useAccount hook

function Page() {
  const router = useRouter();
  const { address, isConnected } = useAccount(); // Get wallet address and connection status

  const companySizes = [
    { value: "1-10", label: "1-10 employees" },
    { value: "11-50", label: "11-50 employees" },
    { value: "51-100", label: "51-100 employees" },
    { value: "101-500", label: "101-500 employees" },
    { value: "501-1000", label: "501-1000 employees" },
    { value: ">1000", label: ">1000 employees" },
  ];

  const sectors = [
    { value: "technology", label: "Technology" },
    { value: "finance", label: "Finance" },
    { value: "healthcare", label: "Healthcare" },
    { value: "energy", label: "Energy" },
    { value: "retail", label: "Retail" },
    { value: "manufacturing", label: "Manufacturing" },
  ];

  const [form, setForm] = useState({
    companyName: "",
    twitterHandle: "",
    companyWebsite: "",
    sector: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error on input
  };

  const handleSubmit = () => {
    if (!isConnected) {
      alert("Please connect your wallet before submitting.");
      return; // Prevent navigation if wallet is not connected
    }

    const newErrors = {};
    if (!form.companyName) newErrors.companyName = "Company name is required.";
    if (!form.twitterHandle)
      newErrors.twitterHandle = "Twitter handle is required.";
    if (!form.companyWebsite)
      newErrors.companyWebsite = "Company website is required.";
    if (!form.sector) newErrors.sector = "Sector is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Proceed to the next page if no errors
    router.push("/company");
  };

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

        <div className="flex items-center justify-center mt-8">
          {isConnected ? (
            <span>{address}</span> // Display connected wallet address
          ) : (
            <span className="text-red-500">Please connect your wallet.</span>
          )}
        </div>

        <div className="flex justify-between mt-10">
          <div className="flex flex-col justify-between w-full gap-10">
            <Input
              isRequired
              type="text"
              label="Company Name"
              variant="underlined"
              className="max-w-xs"
              value={form.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              validationState={errors.companyName ? "invalid" : undefined}
              errorMessage={errors.companyName}
            />

            <Input
              isRequired
              type="text"
              label="Company Website"
              variant="underlined"
              className="max-w-xs"
              value={form.companyWebsite}
              onChange={(e) => handleChange("companyWebsite", e.target.value)}
              validationState={errors.companyWebsite ? "invalid" : undefined}
              errorMessage={errors.companyWebsite}
            />
          </div>

          <div className="flex flex-col justify-between w-full gap-10">
            <Input
              isRequired
              type="text"
              label="Twitter Handle"
              variant="underlined"
              className="max-w-xs"
              value={form.twitterHandle}
              onChange={(e) => handleChange("twitterHandle", e.target.value)}
              validationState={errors.twitterHandle ? "invalid" : undefined}
              errorMessage={errors.twitterHandle}
            />

            <div className="flex flex-col">
              <Autocomplete
                label="Select sector"
                className="max-w-xs"
                variant="underlined"
                isRequired
                onSelectionChange={(value) => handleChange("sector", value)}
                validationState={errors.sector ? "invalid" : undefined}
              >
                {sectors.map((sector) => (
                  <AutocompleteItem key={sector.value} value={sector.value}>
                    {sector.label}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              {errors.sector && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.sector}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center mt-10">
          <Button
            disabled={!isConnected} // Disable the button if wallet is not connected
            endContent={<MoveRight size={16} />}
            onPress={handleSubmit}
          >
            <span>Submit</span>
          </Button>
        </div>
      </div>
      <div className="basis-3/12"></div>
    </div>
  );
}

export default Page;
