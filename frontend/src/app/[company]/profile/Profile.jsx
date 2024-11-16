"use client";

import { Avatar } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/react";
import { Info } from "lucide-react";
import { Progress } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { gql, request } from "graphql-request";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

import "bootstrap-icons/font/bootstrap-icons.css";

const query = gql`
  query GetCompaniesByWallet($submittedBy: Bytes!) {
    companySubmitteds(where: { submittedBy: $submittedBy }) {
      companyName
      twitterHandle
      companyWebsite
      sector
      avatarUrl
    }
  }
`;

export default function App() {
  const { address, isConnected } = useAccount();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isConnected || !address) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await request(
          process.env.NEXT_PUBLIC_SUBGRAPH_COMPANY_DETAILS_ENDPOINT,
          query,
          { submittedBy: address.toLowerCase() }
        );

        if (result.companySubmitteds.length > 0) {
          setCompanyData(result.companySubmitteds[0]);
        } else {
          setCompanyData(null);
        }
      } catch (err) {
        console.error("Error fetching company data:", err);
        setError("Failed to fetch company data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [address, isConnected]);

  if (loading) {
    return <p>Loading company profile...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!companyData) {
    return <p>No company data found for this wallet.</p>;
  }

  const { companyName, twitterHandle, companyWebsite, sector, avatarUrl } =
    companyData;

  return (
    <div className="flex flex-col border-e-2 p-3">
      <div className="flex mb-20">
        <h1 className="text-4xl">Company Profile</h1>
      </div>

      <div className="flex justify-start items-center gap-3">
        <div>
          <Avatar size="lg" src={avatarUrl} />
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-lg font-semibold">
            <span>{companyName}</span>
          </div>
          <div className="text-sm font-light text-gray-400">
            <span>ESG Score</span>
          </div>
        </div>
        <div>
          <Chip
            color="warning"
            radius="sm"
            size="sm"
            startContent={<span>#</span>}
          >
            Pending
          </Chip>
        </div>
      </div>

      <div className="flex mt-3 items-center p-3">
        <span className="text-4xl me-3 font-semibold">--</span>
        <i
          className="bi bi-caret-up-fill text-green-300 me-1"
          style={{ fontSize: "1.5rem" }}
        ></i>
        <span className="text-lg text-green-300">--</span>
        <Info size={15} className="text-gray-300 ms-2" />
      </div>

      <div className="p-3">
        <Progress
          size="sm"
          radius="sm"
          classNames={{
            base: "max-w-md",
            track: "drop-shadow-md border border-default",
            indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
            label: "tracking-wider font-medium text-default-600",
            value: "text-foreground/60",
          }}
          label="ESG Score"
          value={0}
          showValueLabel={true}
        />
      </div>

      <div className="flex mt-5">
        <Table hideHeader removeWrapper aria-label="Company Details">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Sectors</TableCell>
              <TableCell>{sector}</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>Twitter</TableCell>
              <TableCell>{twitterHandle}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Company Website</TableCell>
              <TableCell>{companyWebsite}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
