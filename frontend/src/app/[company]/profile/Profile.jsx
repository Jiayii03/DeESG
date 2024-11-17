"use client";

import { Avatar } from "@nextui-org/avatar";
import { Progress } from "@nextui-org/react";
import { Info } from "lucide-react";
import { Chip } from "@nextui-org/react";
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

const companyQuery = gql`
  query GetLatestCompanyByWallet($submittedBy: Bytes!) {
    companySubmitteds(
      where: { submittedBy: $submittedBy }
      orderBy: blockTimestamp
      orderDirection: desc
      first: 1
    ) {
      companyName
      twitterHandle
      companyWebsite
      sector
      avatarUrl
    }
  }
`;

const esgQuery = gql`
  query GetSecondLatestESGScore {
    aggregatedDataStoreds(
      first: 2
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      aggregatedESGScore
      blockTimestamp
    }
  }
`;

export default function App() {
  const { address, isConnected } = useAccount();
  const [companyData, setCompanyData] = useState(null);
  const [esgScore, setEsgScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const targetAddress =
    "0x75680726646e0F0B28Ea23D232808F25F8b3c829".toLowerCase();

  useEffect(() => {
    if (!isConnected || !address) {
      setCompanyData(null);
      setEsgScore(null);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch company data
        const companyResult = await request(
          process.env.NEXT_PUBLIC_SUBGRAPH_COMPANY_DETAILS_ENDPOINT,
          companyQuery,
          { submittedBy: address.toLowerCase() }
        );

        setCompanyData(companyResult.companySubmitteds[0] || null);

        // Fetch ESG score only for target wallet
        if (address.toLowerCase() === targetAddress) {
          const esgResult = await request(
            process.env.NEXT_PUBLIC_SUBGRAPH_GET_ESG_ENDPOINT,
            esgQuery
          );

          setEsgScore(
            esgResult.aggregatedDataStoreds[1]?.aggregatedESGScore || null
          );
        } else {
          setEsgScore(null);
        }
      } catch (error) {
        setError("Failed to fetch data.");
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
          <Avatar size="lg" src={avatarUrl} alt={`${companyName} Avatar`} />
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-lg font-semibold">
            <span>{companyName}</span>
          </div>
          <div className="text-sm font-light text-gray-400">
            <span>ESG Score</span>
          </div>
        </div>
        {address.toLowerCase() !== targetAddress && (
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
        )}
      </div>

      <div className="flex mt-3 items-center p-3">
        <span className="text-4xl me-3 font-semibold">
          {address.toLowerCase() === targetAddress ? esgScore || "--" : "--"}
        </span>
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
          value={
            address.toLowerCase() === targetAddress
              ? parseFloat(esgScore) || 0
              : 0
          }
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
