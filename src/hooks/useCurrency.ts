import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { CURRENCIES } from "@/lib/constants/create-deal";
import { DealFormData } from "@/lib/types/create-deal";

export const useCurrency = (dealForm: UseFormReturn<DealFormData>) => {
  const [currencySymbol, setCurrencySymbol] = useState("₾");

  useEffect(() => {
    const subscription = dealForm.watch((value) => {
      const currency = CURRENCIES.find((c) => c.id === value.currency);
      setCurrencySymbol(currency?.symbol ?? "₾");
    });

    return () => subscription.unsubscribe();
  }, [dealForm]);

  return {
    currencySymbol,
    selectedCurrency: dealForm.watch("currency"),
    availableCurrencies: CURRENCIES,
  };
};
