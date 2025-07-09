"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import {
  DealFormData,
  dealSchema,
  itemSchema,
  ItemType,
  Payer,
} from "@/types/create-deal/types";
import { CURRENCIES } from "@/lib/constants/create-deal";
import DealDetailsForm from "@/components/primary/forms/create-deal/DealDetailsForm";
import ItemForm from "@/components/primary/forms/create-deal/ItemForm";
import ItemsList from "@/components/primary/forms/create-deal/ItemList";
import { DEAL_CATEGORIES } from "@/lib/constants";
import DealTotal from "@/components/primary/forms/create-deal/DealTotal";

type Totals = {
  totalItemsPrice: number;
  totalPay: number;
  totalReceivable: number;
};

const roundToTwo = (num: number) => Math.round(num * 100) / 100;

const calculateTotals = (
  items: ItemType[],
  dealData: DealFormData & { payer: Payer }
) => {
  const totalItemsPrice = items.reduce((sum, item) => sum + item.price, 0);
  const payer = dealData.payer;

  let totalPay: number;
  let totalReceivable: number;

  if (payer === "buyer") {
    // Buyer pays full 5%
    totalPay = roundToTwo(totalItemsPrice + totalItemsPrice * 0.05);
    totalReceivable = roundToTwo(totalItemsPrice);
  } else if (payer === "seller") {
    // Seller pays full 5%
    totalPay = roundToTwo(totalItemsPrice + totalItemsPrice * 0.05);
    totalReceivable = roundToTwo(totalItemsPrice);
  } else if (payer === "equal") {
    // Split 5% fee half-half: each pays 2.5%
    const halfFeeRate = 0.025; // 2.5%
    totalPay = roundToTwo(totalItemsPrice + totalItemsPrice * halfFeeRate); // payer pays half fee
    totalReceivable = roundToTwo(
      totalItemsPrice - totalItemsPrice * halfFeeRate
    ); // other party receives less by half fee
  } else {
    // Default fallback: no fee
    totalPay = roundToTwo(totalItemsPrice);
    totalReceivable = roundToTwo(totalItemsPrice);
  }

  return { totalItemsPrice, totalPay, totalReceivable };
};

const DealCreatePage = () => {
  const [currencySymbol, setCurrencySymbol] = useState("₾");
  const [items, setItems] = useState<ItemType[]>([]);

  const dealForm = useForm<DealFormData>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      dealName: "",
      inspectionDays: 1,
      currency: "lari",
      payer: "buyer",
      shipping_days: 1,
    },
  });

  const itemForm = useForm<ItemType>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      itemCategory: "",
      itemName: "",
      price: 1,
      itemDescription: "",
    },
  });

  const formDisabled = items.length > 0;

  // Update currency symbol when currency changes
  useEffect(() => {
    const subscription = dealForm.watch((value) => {
      const currency = CURRENCIES.find((c) => c.id === value.currency);
      setCurrencySymbol(currency?.symbol ?? "₾");
    });
    return () => subscription.unsubscribe();
  }, [dealForm]);

  const handleAddItem = async () => {
    const isDealValid = await dealForm.trigger();
    if (!isDealValid) {
      toast.error("გთხოვთ შეავსოთ გარიგების დეტალები სრულად");
      return;
    }

    const isItemValid = await itemForm.trigger();
    if (!isItemValid) return;

    const newItem = itemForm.getValues();
    setItems((prev) => [...prev, newItem]);
    itemForm.reset();
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (values: DealFormData) => {
    if (items.length === 0) {
      toast.error("გთხოვთ დაამატოთ მინიმუმ ერთი ნივთი");
      return;
    }

    const formData = { ...values, items };
    const totals = calculateTotals(items, values);

    // Combine form data with totals for API submission
    const submissionData = { ...formData, totals };

    console.log("Submitting deal:", submissionData);

    // TODO: Send submissionData to API
    alert(JSON.stringify(submissionData, null, 2));
  };

  // Calculate totals for current state
  const totals = calculateTotals(items, dealForm.getValues());

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-heading">
            შექმენით გარიგება
          </CardTitle>
          <CardDescription>შეიყვანეთ ყველაფერი დეტალურად</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...dealForm}>
            <form
              onSubmit={dealForm.handleSubmit(handleSubmit)}
              className="space-y-6 mb-4"
            >
              <DealDetailsForm
                control={dealForm.control}
                formDisabled={formDisabled}
                currencies={CURRENCIES}
              />

              {formDisabled && (
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    გარიგების დეტალების შეცვლა შეუძლებელია, რადგან
                    ნივთები/სერვისები უკვე დამატებულია.
                  </p>
                </div>
              )}

              <Separator />

              <div className="space-y-4">
                <h2 className="text-2xl font-heading font-bold">ნივთები</h2>

                <ItemForm
                  form={itemForm}
                  currencySymbol={currencySymbol}
                  onAddItem={handleAddItem}
                  categories={DEAL_CATEGORIES}
                />

                <ItemsList
                  items={items}
                  currencySymbol={currencySymbol}
                  onRemoveItem={handleRemoveItem}
                />
              </div>

              {formDisabled && (
                <DealTotal
                  items={items}
                  dealData={dealForm.getValues()}
                  totals={totals}
                />
              )}

              <Button
                type="submit"
                className="w-full mt-6"
                disabled={items.length === 0}
              >
                შემდეგი
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealCreatePage;
