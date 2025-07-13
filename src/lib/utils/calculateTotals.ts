import { DealFormData, ItemType, Payer } from "@/lib/types/create-deal";
import { DealTotals } from "../services/deal-api";

export const roundToTwo = (num: number) => Math.round(num * 100) / 100;

export const calculateTotals = (
  items: ItemType[],
  dealData: DealFormData & { payer: Payer }
): DealTotals => {
  const totalItemsPrice = items.reduce(
    (sum, item) => Number(sum) + Number(item.price),
    0
  );
  const payer = dealData.payer;

  let totalPay: number;
  let totalReceivable: number;

  if (payer === "buyer" || payer === "seller") {
    totalPay = roundToTwo(Number(totalItemsPrice) * 1.05);
    totalReceivable = roundToTwo(Number(totalItemsPrice));
  } else if (payer === "equal") {
    const halfFeeRate = 0.025;
    totalPay = roundToTwo(Number(totalItemsPrice) * (1 + halfFeeRate));
    totalReceivable = roundToTwo(Number(totalItemsPrice) * (1 - halfFeeRate));
  } else {
    totalPay = totalReceivable = roundToTwo(Number(totalItemsPrice));
  }

  return { totalItemsPrice, totalPay, totalReceivable };
};
