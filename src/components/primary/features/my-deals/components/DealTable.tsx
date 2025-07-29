"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Deal } from "@prisma/client";
import { dealStatusTranslations, dealStatusVariants } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

type Props = {
  userEmail: string;
  deals: Deal[];
};

const DealTable = ({ userEmail, deals }: Props) => {
  return (
    <Table className="text-center">
      <TableCaption>თქვენი ბოლო ტრანზაქციები</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">სახელი</TableHead>
          <TableHead className="text-center">სტატუსი</TableHead>
          <TableHead className="text-center">თანხა</TableHead>
          <TableHead className="text-center">როლი</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deals.map((deal) => (
          <TableRow key={deal.id} className="hover:bg-muted">
            <Link href={`/app/deal/${deal.id}`} className="contents">
              <TableCell className="font-medium cursor-pointer">
                {deal.name}
              </TableCell>
              <TableCell className="cursor-pointer">
                <Badge variant={dealStatusVariants[deal.status]}>
                  {dealStatusTranslations[deal.status]}
                </Badge>
              </TableCell>
              <TableCell className="cursor-pointer">{deal.amount}</TableCell>
              <TableCell className="cursor-pointer">
                {deal.buyerEmail === userEmail ? "მყიდველი" : "გამყიდველი"}
              </TableCell>
            </Link>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DealTable;
