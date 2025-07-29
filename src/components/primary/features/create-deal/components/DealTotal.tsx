import { CURRENCIES } from "@/lib/constants/create-deal";
import { DealFormData, ItemType } from "@/lib/types/create-deal";
import React from "react";

type Totals = {
  totalItemsPrice: number;
  totalPay: number;
  totalReceivable: number;
};

type Props = {
  items: ItemType[];
  dealData: DealFormData;
  totals: Totals;
};

const DealTotal = ({ dealData, totals }: Props) => {
  const { totalItemsPrice, totalPay, totalReceivable } = totals;

  const currency = CURRENCIES.find((c) => c.id === dealData.currency);
  const currencyName = currency?.name_ka ?? "";
  const currencySymbol = currency?.symbol ?? "";

  // ✅ Format number to 2 decimal places as string
  const formatPrice = (num: number) => num.toFixed(2);

  return (
    <div className="p-4 bg-gray-50 rounded-md">
      <h3 className="text-xl font-heading font-semibold mb-2">შეჯამება</h3>

      <p>
        <strong>სერვისის თანხას იხდის:</strong>{" "}
        {dealData.payer === "buyer"
          ? "მყიდველი"
          : dealData.payer === "seller"
            ? "გამყიდველი"
            : "ნახევარ-ნახევარი"}
      </p>

      <div className="space-y-4 mt-2">
        <p>
          <strong>გარიგების ღირებულებაა:</strong> {formatPrice(totalItemsPrice)}{" "}
          {currencyName}
        </p>

        <p>
          <strong>სერვისის ღირებულება:</strong>{" "}
          {formatPrice(totalItemsPrice * 0.05)} {currencySymbol}
          <br />
          <strong>თქვენი გადასახდელი თანხა:</strong> {formatPrice(totalPay)}{" "}
          {currencyName}
          <br />
          <strong>გამყიდველის მისაღები თანხა:</strong>{" "}
          {formatPrice(totalReceivable)} {currencyName}
        </p>
      </div>
    </div>
  );
};

export default DealTotal;
