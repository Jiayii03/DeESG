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
          <TableCell>Sectors</TableCell>
          <TableCell>--</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Twitter</TableCell>
          <TableCell>--</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Company Website</TableCell>
          <TableCell>--</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
