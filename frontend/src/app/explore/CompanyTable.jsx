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

export default function CompanyTable({ onRowClick }) {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); // Track selected row

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

  // Set the first row as selected by default after data is loaded
  useEffect(() => {
    if (list.length > 0) {
      const firstItem = {
        ...list[0],
        avatarUrl: `companies_nouns/company${(0 % 10) + 1}.svg`,
      };
      setSelectedRow(firstItem);
      onRowClick(firstItem); // Trigger callback with the first row data
    }
  }, [list, onRowClick]);

  const handleRowClick = (item, index) => {
    const itemWithAvatar = {
      ...item,
      avatarUrl: `companies_nouns/company${(index % 10) + 1}.svg`,
    };
    setSelectedRow(itemWithAvatar);
    onRowClick(itemWithAvatar); // Notify parent component
  };

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
        <TableColumn key="esg_score">ESG Score</TableColumn>
        <TableColumn key="number_of_devices">Number of Devices</TableColumn>
        <TableColumn key="number_of_employees">Number of Employees</TableColumn>
        <TableColumn key="gtk">GTK</TableColumn>
      </TableHeader>
      <TableBody
        items={list}
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(item) => {
          const index = list.findIndex(
            (listItem) => listItem.company_name === item.company_name
          );
          const isSelected =
            selectedRow && selectedRow.company_name === item.company_name;
          return (
            <TableRow
              key={item.company_name}
              onClick={() => handleRowClick(item, index)}
              className={`cursor-pointer hover:bg-gray-100 ${
                isSelected ? "bg-gray-200" : ""
              }`}
            >
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
