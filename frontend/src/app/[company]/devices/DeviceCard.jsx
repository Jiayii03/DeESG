"use client";

import React, { useState, useEffect } from "react";
import { BrowserProvider, ethers } from "ethers";
import { Card, CardBody, CardHeader, CardFooter, Button } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { smartwalletABI, smartwalletAddress } from "../../abis/smartwallet";

export default function DeviceCard() {
  const router = useRouter();
  const [notification, setNotification] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [balance, setBalance] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    const initializeProvider = async () => {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
          const browserProvider = new BrowserProvider(window.ethereum);
          setProvider(browserProvider);

          // Fetch accounts and set signer
          const accounts = await browserProvider.listAccounts();
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            const jsonRpcSigner = await browserProvider.getSigner();
            setSigner(jsonRpcSigner);
          }
        } catch (error) {
          console.error("Error setting up BrowserProvider:", error);
          triggerNotification("Failed to connect to the wallet.");
        }
      } else {
        triggerNotification("No Ethereum wallet detected. Please install MetaMask.");
      }
    };

    initializeProvider();
  }, []);

  useEffect(() => {
    if (provider) {
      fetchContractBalance();
    }
  }, [provider, walletAddress]);

  const connectWallet = async () => {
    if (!provider) {
      triggerNotification("Please install MetaMask or another Web3 wallet.");
      return;
    }
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
      const signer = await provider.getSigner();
      setSigner(signer);
      triggerNotification("Wallet connected successfully.");
    } catch (error) {
      console.error("Error connecting wallet:", error);
      triggerNotification("Failed to connect wallet.");
    }
  };

  const checkOwnershipAndClaim = async () => {
    if (!signer) {
      triggerNotification("Please connect your wallet first.");
      return;
    }

    try {
      const smartWalletContract = new ethers.Contract(
        smartwalletAddress,
        smartwalletABI,
        signer
      );

      const owner = await smartWalletContract.owner();
      const connectedWallet = await signer.getAddress();

      console.log("Contract Owner:", owner);
      console.log("Connected Wallet Address:", connectedWallet);

      if (
        typeof connectedWallet === "string" &&
        connectedWallet.toLowerCase() === owner.toLowerCase()
      ) {
        const tx = await smartWalletContract.verifyAndWithdraw();
        await tx.wait();
        triggerNotification("Tokens claimed successfully!");

        // Refresh balance after successful withdrawal
        fetchContractBalance();
      } else {
        triggerNotification("Only the owner of this Smart Wallet can claim tokens.");
      }
    } catch (error) {
      triggerNotification("An error occurred during the claim process.");
    }
  };

  const fetchContractBalance = async () => {
    if (!provider) {
      triggerNotification("Please connect your wallet first.");
      return;
    }

    try {
      const smartWalletContract = new ethers.Contract(
        smartwalletAddress,
        smartwalletABI,
        provider
      );

      const greenTokenBalance = await smartWalletContract.getGreenTokenBalance();
      const formattedBalance = ethers.formatEther(greenTokenBalance);
      setBalance(formattedBalance);
    } catch (error) {
      console.error("Error fetching contract balance:", error);
      triggerNotification("Failed to fetch contract balance.");
    }
  };

  const triggerNotification = (message) => {
    setNotification(message);
    setShowNotification(true);

    // Hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  return (
    <div className="flex flex-col border-e-2 p-3 h-screen pe-6">
      <div className="flex flex-col mb-10 gap-2 justify-start">
        <div>
          <Button
            className="bg-transparent"
            startContent={<MoveLeft size={16} />}
            onPress={() => router.push("/company")}
          >
            <span>Back</span>
          </Button>
        </div>

        <div>
          <h1 className="text-4xl">Devices Dashboard</h1>
          <div className="flex justify-start items-center gap-20 mt-3">
            <span className="text-sm text-gray-400">Total devices:</span>
            <span className="text-sm text-gray-400">Total Token Rewarded:</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 justify-start items-start">
        <Card className="w-full p-2">
          <CardHeader>
            <div className="flex justify-between items-center gap-3 w-full">
              <div className="flex justify-start items-center gap-3">
                <Avatar name="device"></Avatar>
                <span className="text-semibold text-xl">DEV001</span>
              </div>
              <div>
                <Button
                  style={{ backgroundColor: "#8884d8" }}
                  className="text-white"
                  onPress={checkOwnershipAndClaim}
                >
                  Claim
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <span className="text-semibold">GTK Balance:</span>
                <span>{balance !== null ? `${balance} GTK` : "--"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-semibold">Status:</span>
                <span>{walletAddress ? "Connected" : "Disconnected"}</span>
              </div>
            </div>
          </CardBody>
          <CardFooter className="flex justify-end items-center">
            <Button
              className="text-gray-500"
              variant="ghost"
              onPress={fetchContractBalance}
            >
              Refresh Balance
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div
        className={`fixed bottom-4 left-0 bg-gray-800 text-white px-4 py-2 rounded-md shadow-md transition-transform duration-500 ${
          showNotification ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {notification}
      </div>
    </div>
  );
}
