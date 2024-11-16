"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function App() {
  return (
    <Table
      hideHeader
      removeWrapper
      aria-label="Example static collection table"
    >
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>STATUS</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Market Cap ($USD)</TableCell>
          <TableCell>1.00 trillion</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Number of Devices</TableCell>
          <TableCell>125</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Number of Employees</TableCell>
          <TableCell>121,858</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>GTK Token Earned</TableCell>
          <TableCell>120</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
