"use client";

import { Button } from "@nextui-org/react";
import { gql, request } from "graphql-request";
import { ethers } from "ethers";
import ContractABI from "../../abis/AggregateAiData.json";

const QUERY = gql`
  query GetEmissionsData {
    dataStoreds {
      CO2_emissions
      methane_emissions
      NOx_emissions
      PM_emissions
    }
  }
`;

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_AGGREGATE_AI_CONTRACT_ADDRESS;

export default function App() {
  const handleEvaluate = async () => {
    try {
      const endpoint = process.env.NEXT_PUBLIC_SUBGRAPH_SEPOLIA_ENDPOINT;
      const result = await request(endpoint, QUERY);

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

      // Send data to the three endpoints
      const endpoints = [
        "http://84.247.151.195:8001/predict_esg/1",
        "http://84.247.151.195:8002/predict_esg/2",
        "http://84.247.151.195:8003/predict_esg/3",
      ];

      await Promise.all(
        endpoints.map(async (url) => {
          try {
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
            if (!response.ok) {
              throw new Error(
                `Failed to send data to ${url}: ${response.statusText}`
              );
            }
          } catch (err) {
            console.error(`Error sending data to ${url}:`, err);
            throw err; // Rethrow to break the Promise.all
          }
        })
      );

      alert("Data sent to endpoints. Now requesting ESG score...");

      // Call requestESGScore after successful submission
      await requestESGScore();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
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

  return (
    <div className="flex flex-col justify-start gap-10 p-10">
      <div className="flex justify-between">
        <h1 className="text-2xl">ESG Score</h1>
        <Button onClick={handleEvaluate}>Evaluate</Button>
      </div>
    </div>
  );
}
