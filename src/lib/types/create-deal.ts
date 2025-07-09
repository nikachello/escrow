// types.ts
import { z } from "zod";

export type DealFormData = z.infer<typeof dealSchema>;
export type ItemType = z.infer<typeof itemSchema>;

export interface Currency {
  id: string;
  name_ka: string;
  symbol: string;
}

export interface Category {
  id: string;
  name_ka: string;
}

export type Payer = "seller" | "buyer" | "equal";

export const dealSchema = z.object({
  dealName: z
    .string()
    .min(2, "მინიმუმ 2 სიმბოლო")
    .max(20, "მაქსიმუმ 20 სიმბოლო"),
  inspectionDays: z.number().min(1, "უნდა იყოს მინიმუმ 1"),
  currency: z.string().nonempty("აირჩიეთ ვალუტა"),
  payer: z.enum(["seller", "buyer", "equal"]),
  shipping_days: z.number().min(1, "უნდა იყოს მინიმუმ 1"),
});

export const itemSchema = z.object({
  itemCategory: z.string().nonempty("აირჩიეთ კატეგორია"),
  itemName: z
    .string()
    .min(2, "მინიმუმ 2 სიმბოლო")
    .max(50, "მაქსიმუმ 50 სიმბოლო"),
  price: z.number().min(1, "მინიმუმ 1"),
  itemDescription: z
    .string()
    .min(20, "მინიმუმ 20 სიმბოლო")
    .max(1000, "მაქსიმუმ 1000 სიმბოლო"),
});
