// constants.ts
import { Currency } from "@/types/create-deal/types";
import { z } from "zod";

export const CURRENCIES: Currency[] = [
  { id: "lari", name_ka: "ლარი", symbol: "₾" },
  { id: "usd", name_ka: "დოლარი", symbol: "$" },
  { id: "rub", name_ka: "რუბლი", symbol: "₽" },
];
