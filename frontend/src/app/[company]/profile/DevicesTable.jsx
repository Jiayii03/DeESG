"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";

export default function App() {
  return (
    <Table removeWrapper aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>#</TableColumn>
        <TableColumn>NAME</TableColumn>
        <TableColumn>Wallet Address</TableColumn>
        <TableColumn>GTK Balance</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>1</TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Avatar name="DEV001" size="sm"></Avatar>
              <span>DEV001</span>
            </div>
          </TableCell>
          <TableCell>--</TableCell>
          <TableCell>--</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>2</TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Avatar name="DEV001" size="sm"></Avatar>
              <span>DEV001</span>
            </div>
          </TableCell>
          <TableCell>--</TableCell>
          <TableCell>--</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>3</TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Avatar name="DEV001" size="sm"></Avatar>
              <span>DEV001</span>
            </div>
          </TableCell>
          <TableCell>--</TableCell>
          <TableCell>--</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
