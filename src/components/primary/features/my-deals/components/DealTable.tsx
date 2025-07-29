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
import {
  CurrencySymbolMap,
  dealStatusTranslations,
  dealStatusVariants,
} from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

type Props = {
  userEmail: string;
  deals: Deal[];
  sellerDeals: Deal[];
};

const DealTable = ({ userEmail, deals, sellerDeals }: Props) => {
  const totalReceivable = sellerDeals.reduce(
    (sum, deal) => sum + deal.sellerReceivable,
    0
  );

  return (
    <div>
      {/* 💰 Accounting summary */}
      <div className="flex justify-end mb-4">
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            მისაღები თანხა (დასრულებული გარიგებებიდან)
          </p>
          <p className="text-lg font-bold text-green-600">
            ₾ {totalReceivable.toFixed(2)}
          </p>
        </div>
      </div>

      <Table className="text-center">
        <TableCaption>თქვენი ბოლო გარიგებები</TableCaption>
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
                <TableCell className="cursor-pointer">
                  {CurrencySymbolMap[deal.currency]} {deal.amount}
                </TableCell>
                <TableCell className="cursor-pointer">
                  {deal.buyerEmail === userEmail ? "მყიდველი" : "გამყიდველი"}
                </TableCell>
              </Link>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default DealTable;
