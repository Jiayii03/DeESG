import React, { useEffect, useState } from "react";
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { gql, request } from "graphql-request";

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

const Example = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const endpoint = process.env.NEXT_PUBLIC_SUBGRAPH_SEPOLIA_ENDPOINT;
      try {
        const result = await request(endpoint, QUERY);

        const emissions = result.dataStoreds;

        if (emissions.length > 0) {
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

          const averages = [
            { name: "CO2", value: totalEmissions.CO2_emissions / emissions.length },
            { name: "Methane", value: totalEmissions.methane_emissions / emissions.length },
            { name: "NOx", value: totalEmissions.NOx_emissions / emissions.length },
            { name: "PM", value: totalEmissions.PM_emissions / emissions.length },
          ];

          setData(averages);
        }
      } catch (error) {
        console.error("Error fetching emissions data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width={500} height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Example;
