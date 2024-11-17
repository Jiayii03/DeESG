"use client";

import { Button } from "@nextui-org/react";
import { gql, request } from "graphql-request";
import { useState } from "react";
import { ethers } from "ethers";
import ContractABI from "../../abis/AggregateAiData.json";

const QUERY_EMISSIONS = gql`
  query GetEmissionsData {
    dataStoreds {
      CO2_emissions
      methane_emissions
      NOx_emissions
      PM_emissions
    }
  }
`;

const QUERY_ESG_SCORE = gql`
  query GetLatestESGScore {
    aggregatedDataStoreds(first: 1, orderBy: blockTimestamp, orderDirection: desc) {
      aggregatedESGScore
      mostCommonRiskCategory
      blockTimestamp
    }
  }
`;

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_AGGREGATE_AI_CONTRACT_ADDRESS;

export default function App() {
  const [esgScore, setEsgScore] = useState(null);
  const [riskCategory, setRiskCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEvaluate = async () => {
    setLoading(true);
    try {
      // Fetch emissions data
      const emissionsEndpoint = process.env.NEXT_PUBLIC_SUBGRAPH_SEPOLIA_ENDPOINT;
      const result = await request(emissionsEndpoint, QUERY_EMISSIONS);

      const emissions = result.dataStoreds;
      if (emissions.length === 0) {
        alert("No emissions data found!");
        return;
      }

      // Calculate averages
      const totalEmissions = emissions.reduce(
        (totals, entry) => {
          totals.CO2_emissions += parseInt(entry.CO2_emissions);
          totals.methane_emissions += parseInt(entry.methane_emissions);
          totals.NOx_emissions += parseInt(entry.NOx_emissions);
          totals.PM_emissions += parseInt(entry.PM_emissions);
          return totals;
        },
        {
          CO2_emissions: 0,
          methane_emissions: 0,
          NOx_emissions: 0,
          PM_emissions: 0,
        }
      );

      const averages = {
        CO2_emissions_tons_per_year:
          totalEmissions.CO2_emissions / emissions.length,
        methane_emissions_tons_per_year:
          totalEmissions.methane_emissions / emissions.length,
        NOx_emissions_tons_per_year:
          totalEmissions.NOx_emissions / emissions.length,
        PM_emissions_tons_per_year:
          totalEmissions.PM_emissions / emissions.length,
      };

      // Dummy Data + Averages
      const data = {
        market_cap_USD_millions: 5000,
        revenue_USD_millions: 1200,
        employee_count: 1500,
        years_in_operation: 10,
        rd_spending_percentage: 15,
        ...averages,
      };

      const endpoints = [
        "http://84.247.151.195:8001/predict_esg/1",
        "http://84.247.151.195:8002/predict_esg/2",
        "http://84.247.151.195:8003/predict_esg/3",
      ];

      await Promise.all(
        endpoints.map((url) =>
          fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          })
        )
      );

      await requestESGScore();
      fetchLatestESGScore(); // Fetch the latest ESG score after submitting
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const requestESGScore = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ContractABI,
        signer
      );

      const tx = await contract.requestESGScore();
      console.log("Transaction sent:", tx.hash);

      await tx.wait();
      alert("ESG Score requested successfully!");
    } catch (error) {
      console.error("Error requesting ESG score:", error);
      alert("Failed to request ESG score. Check console for details.");
    }
  };

  const fetchLatestESGScore = async () => {
    try {
      const esgEndpoint = process.env.NEXT_PUBLIC_SUBGRAPH_GET_ESG_ENDPOINT;
      const result = await request(esgEndpoint, QUERY_ESG_SCORE);

      const latestData = result.aggregatedDataStoreds[0];
      if (latestData) {
        setEsgScore(latestData.aggregatedESGScore);
        setRiskCategory(latestData.mostCommonRiskCategory);
      } else {
        alert("No ESG score found!");
      }
    } catch (error) {
      console.error("Error fetching ESG score:", error);
    }
  };

  return (
    <div className="flex flex-col justify-start gap-10 p-10">
      <div className="flex justify-between">
        <h1 className="text-2xl">ESG Score</h1>
        <Button onClick={handleEvaluate} disabled={loading}>
          {loading ? "Evaluating..." : "Evaluate"}
        </Button>
      </div>
      {esgScore && (
        <div>
          <h2>Latest ESG Score: {esgScore}</h2>
          <h3>Risk Category: {riskCategory}</h3>
        </div>
      )}
    </div>
  );
}