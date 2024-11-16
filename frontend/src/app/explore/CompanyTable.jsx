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
import { Avatar } from "@nextui-org/react";
import companyData from "./companyData.json";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        setList(companyData);
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
        s
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(item) => {
          const index = list.findIndex(
            (listItem) => listItem.company_name === item.company_name
          );
          return (
            <TableRow key={item.company_name}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "company_name" ? (
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={`companies_nouns/company${(index % 10) + 1}.svg`}
                        name={item.company_name}
                        size="sm"
                        fallback={item.company_name.slice(0, 3).toUpperCase()}
                      />
                      <span>{item.company_name}</span>
                    </div>
                  ) : (
                    item[columnKey]
                  )}
                </TableCell>
              )}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
}
