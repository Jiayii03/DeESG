import React, { useEffect, useState } from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { gql, request } from 'graphql-request';

const QUERY = gql`
  query GetEmissionsData {
    dataStoreds {
      timestamp
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
          const processedData = emissions.map((entry) => {
            const averageEmissions =
              (parseInt(entry.CO2_emissions) +
                parseInt(entry.methane_emissions) +
                parseInt(entry.NOx_emissions) +
                parseInt(entry.PM_emissions)) /
              4;

            return {
              timestamp: new Date(parseInt(entry.timestamp) * 1000).toLocaleDateString(), // Convert to readable date
              averageEmissions,
            };
          });

          setData(processedData);
        }
      } catch (error) {
        console.error('Error fetching emissions data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width={500} height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="averageEmissions" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Example;
