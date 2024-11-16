"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { gql, request } from "graphql-request";

const QUERY = gql`
  query GetDataStored {
    dataStoreds(orderBy: blockTimestamp, orderDirection: desc) {
      id
      CO2_emissions
      methane_emissions
      NOx_emissions
      PM_emissions
      humidity
      temperature
      timestamp
    }
  }
`;

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const endpoint = process.env.NEXT_PUBLIC_SUBGRAPH_SEPOLIA_ENDPOINT;
      try {
        const result = await request(endpoint, QUERY);
        setData(result.dataStoreds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <Table removeWrapper aria-label="Environmental Data Table">
      <TableHeader>
        <TableColumn>CO2 Emissions</TableColumn>
        <TableColumn>Methane Emissions</TableColumn>
        <TableColumn>NOx Emissions</TableColumn>
        <TableColumn>PM Emissions</TableColumn>
        <TableColumn>Humidity</TableColumn>
        <TableColumn>Temperature</TableColumn>
        <TableColumn>Timestamp</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell>{entry.CO2_emissions}</TableCell>
            <TableCell>{entry.methane_emissions}</TableCell>
            <TableCell>{entry.NOx_emissions}</TableCell>
            <TableCell>{entry.PM_emissions}</TableCell>
            <TableCell>{entry.humidity}</TableCell>
            <TableCell>{entry.temperature}</TableCell>
            <TableCell>
              {new Date(parseInt(entry.timestamp) * 1000).toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
