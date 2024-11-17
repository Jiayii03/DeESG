"use client";

import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Spinner,
} from "@nextui-org/react";
import { MoveLeft, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import CompanyDetails from "../abis/CompanyDetails.json";
const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_COMPANY_DETAILS_CONTRACT_ADDRESS;

function Page() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [nounsIndex, setNounsIndex] = useState(0); // Track current Nouns avatar index
  const [nounsAvatar, setNounsAvatar] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

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

  const generateNounsAvatar = (index) => {
    const baseUrl = "https://noun-api.com/beta/pfp";
    const params = new URLSearchParams({
      size: "320",
      id: index.toString(), // Use index for specific Noun
    });

    return `${baseUrl}?${params.toString()}`;
  };

  useEffect(() => {
    // Load stored index or use default
    const storedIndex = localStorage.getItem("nounsIndex");
    const initialIndex = storedIndex ? parseInt(storedIndex, 10) : 0;
    setNounsIndex(initialIndex);
    setNounsAvatar(generateNounsAvatar(initialIndex));
  }, []);

  const handleAvatarChange = (direction) => {
    const newIndex = direction === "left" ? nounsIndex - 1 : nounsIndex + 1;
    const normalizedIndex = (newIndex + 10000) % 10000; // Ensure index stays within range
    setNounsIndex(normalizedIndex);
    setNounsAvatar(generateNounsAvatar(normalizedIndex));
    localStorage.setItem("nounsIndex", normalizedIndex); // Save index to local storage
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async () => {
    if (!isConnected) {
      alert("Please connect your wallet before submitting.");
      return;
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

    try {
      setLoading(true); // Show loading overlay
      const { ethereum } = window;
      if (!ethereum) {
        console.error("Ethereum object not found, please install MetaMask!");
        alert("Please install MetaMask!");
        return;
      }

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CompanyDetails.abi || CompanyDetails,
        signer
      );

      const tx = await contract.submitCompany(
        form.companyName,
        form.twitterHandle,
        form.companyWebsite,
        form.sector,
        nounsAvatar
      );

      await tx.wait();

      alert("Company submitted successfully!");
      router.push("/company");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      alert("Submission failed. Check the console for details.");
    } finally {
      setLoading(false); // Hide loading overlay
    }
  };

  return (
    <div className="flex gap-3 mb-10 relative">
      {loading && (
        <div className="absolute inset-0 bg-transparent bg-opacity-75 flex justify-center items-center z-50">
          <Spinner size="lg" color="primary" />
        </div>
      )}
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

        <div className="flex items-center justify-center mt-8 font-semibold gap-5">
          <Button isIconOnly onPress={() => handleAvatarChange("left")}>
            <MoveLeft size={16} />
          </Button>
          <Avatar
            src={nounsAvatar}
            alt="Nouns Avatar"
            className="w-20 h-20 cursor-pointer"
            onError={() => console.error("Error loading avatar")}
          />
          <Button isIconOnly onPress={() => handleAvatarChange("right")}>
            <MoveRight size={16} />
          </Button>

          {isConnected ? (
            <span></span>
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
            disabled={!isConnected || loading}
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
