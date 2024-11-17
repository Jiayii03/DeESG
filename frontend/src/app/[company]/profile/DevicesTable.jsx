"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { smartwalletABI, smartwalletAddress } from "../../abis/smartwallet";

export default function App() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState("--");
  const [balance, setBalance] = useState("--");
  const targetWallet =
    "0x75680726646e0F0B28Ea23D232808F25F8b3c829".toLowerCase();
  const SmartWallet = "0xeFC2878dC0529f11Fd2BD1Cb78aA885E41cE94aa";

  useEffect(() => {
    const fetchBalanceAndAddress = async () => {
      if (typeof window.ethereum === "undefined") {
        console.error("Ethereum wallet not detected.");
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []); // Prompt user to connect wallet

        const signer = await provider.getSigner();
        const detectedWallet = await signer.getAddress();
        console.log("Connected Wallet Address:", detectedWallet);

        if (detectedWallet.toLowerCase() === targetWallet) {
          setWalletAddress(SmartWallet);

          // Fetch GTK balance from the smart contract
          const smartWalletContract = new ethers.Contract(
            smartwalletAddress,
            smartwalletABI,
            provider
          );

          const greenTokenBalance =
            await smartWalletContract.getGreenTokenBalance();
          const formattedBalance = ethers.formatEther(greenTokenBalance);
          console.log("GTK Balance:", formattedBalance);
          setBalance(`${formattedBalance} GTK`);
        } else {
          console.warn("Detected wallet is not the target wallet.");
          setWalletAddress("--");
          setBalance("--");
        }
      } catch (error) {
        console.error("Error fetching wallet data:", error.message);
      }
    };

    fetchBalanceAndAddress();
  }, []);

  return (
    <div className="flex flex-col justify-start gap-10 p-10">
      <div className="flex justify-between gap-4 items-center">
        <div className="flex">
          <h1 className="text-2xl">Devices</h1>
          <Button
            isIconOnly
            size="sm"
            className="bg-transparent"
            onPress={() => router.push("/company/devices")}
          >
            <ExternalLink />
          </Button>
        </div>
        <Button>Add</Button>
      </div>
      <Table removeWrapper aria-label="Device Table">
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>Wallet Address</TableColumn>
          <TableColumn>GTK Balance</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>1</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar name="DEV001" size="sm" />
                <span>DEV001</span>
              </div>
            </TableCell>
            <TableCell>{walletAddress}</TableCell>
            <TableCell>{balance}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
