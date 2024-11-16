"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";
import companyData from "./companyData.json"; // Adjust the path to your JSON file

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    // Simulate async loading of dummy data
    const loadData = async () => {
      setIsLoading(true);
      try {
        setList(companyData); // Use the imported JSON data
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <Table
      removeWrapper
      aria-label="Company table with client-side data"
      classNames={{
        table: "min-h-[400px]",
      }}
    >
      <TableHeader>
        <TableColumn key="company_name">Company Name</TableColumn>
        <TableColumn key="esg_score" allowsSorting>
          ESG Score
        </TableColumn>
        <TableColumn key="number_of_devices" allowsSorting>
          Number of Devices
        </TableColumn>
        <TableColumn key="number_of_employees" allowsSorting>
          Number of Employees
        </TableColumn>
        <TableColumn key="gtk" allowsSorting>
          GTK
        </TableColumn>
      </TableHeader>
      <TableBody
        items={list}
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(item) => (
          <TableRow key={item.company_name}>
            {(columnKey) => (
              <TableCell>{item[columnKey]}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}