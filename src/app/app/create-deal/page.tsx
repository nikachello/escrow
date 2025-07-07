"use client";

import React, { useState } from "react";
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
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/aceternity/input";
import SelectField from "@/components/primary/forms/SelectField";
import InputField from "@/components/primary/forms/InputField";
import { DEAL_CATEGORIES } from "@/lib/constants";
import { Textarea } from "@/components/ui/textarea";

const CURRENCIES = [
  { id: "lari", name_ka: "ლარი", symbol: "₾" },
  { id: "usd", name_ka: "დოლარი", symbol: "$" },
  { id: "rub", name_ka: "რუბლი", symbol: "₽" },
];

const dealSchema = z.object({
  dealName: z
    .string()
    .min(2, { message: "მინიმუმ 2 სიმბოლო" })
    .max(20, { message: "მაქსიმუმ 20 სიმბოლო" }),
  inspectionDays: z.number().min(1, { message: "უნდა იყოს მინიმუმ 1" }),
  currency: z.string().nonempty({ message: "აირჩიეთ ვალუტა" }),
  dealCategory: z.string().nonempty({ message: "აირჩიეთ კატეგორია" }),
  itemName: z
    .string()
    .min(2, { message: "მინიმუმ 2 სიმბოლო" })
    .max(50, "მაქსიმუმ 50 სიმბოლო"),
  price: z.number().min(1, { message: "უნდა იყოს მინიმუმ 1" }),
  itemDescription: z
    .string()
    .min(30, { message: "მინიმუმ 30 სიმბოლო" })
    .max(1000, { message: "მაქსიმუმ 1000 სიმბოლო" }),
});

type DealFormData = z.infer<typeof dealSchema>;

const DealCreatePage = () => {
  const [currencySymbol, setCurrencySymbol] = useState("₾");

  const form = useForm<DealFormData>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      dealName: "",
      inspectionDays: 1,
      currency: "lari",
      dealCategory: "",
      itemName: "",
      price: 0,
      itemDescription: "",
    },
  });

  const onCurrencyChange = (value: string) => {
    const found = CURRENCIES.find((c) => c.id === value);
    setCurrencySymbol(found?.symbol ?? "");
  };

  const onSubmit = (values: DealFormData) => {
    alert(JSON.stringify(values, null, 2));
    // submit your deal data here
  };

  return (
    <div>
      <Card className="w-3/4 lg:w-1/2 m-auto mt-5">
        <CardHeader className="font-heading">
          <CardTitle className="text-2xl">შექმენით გარიგება</CardTitle>
          <CardDescription>შეიყვანეთ ყველაფერი დეტალურად</CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-4 flex-col"
            >
              <InputField
                control={form.control}
                name="dealName"
                label="გარიგების სახელი"
                placeholder="გარიგება 1"
              />
              <div className="w-full gap-4 flex flex-row justify-stretch items-center">
                <FormField
                  control={form.control}
                  name="inspectionDays"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>შემოწმების დღეები</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <SelectField
                  name="currency"
                  control={form.control}
                  options={CURRENCIES}
                  placeholder="აირჩიეთ ვალუტა"
                  label="აირჩიეთ ვალუტა"
                  onChange={onCurrencyChange}
                />
              </div>

              <SelectField
                name="dealCategory"
                control={form.control}
                options={DEAL_CATEGORIES}
                placeholder="აირჩიეთ კატეგორია"
                label="აირჩიეთ კატეგორია"
              />

              <div className="w-full gap-4 flex flex-row justify-stretch items-center">
                <InputField
                  control={form.control}
                  name="itemName"
                  label="ნივთის დასახელება"
                  placeholder="ლურჯი მოსაცმელი"
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>ფასი {currencySymbol}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          min={1}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="itemDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="მოგვიყევით ნივთისა და გარიგების შესახებ"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-4">
                შექმნა
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealCreatePage;
