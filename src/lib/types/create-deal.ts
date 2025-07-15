// types.ts
import { z } from "zod";

export type DealFormData = z.infer<typeof dealSchema>;
export type ItemType = z.infer<typeof itemSchema>;
export type dealSellerData = z.infer<typeof dealSellerSchema>;

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

const positiveNumber = z
  .string()
  .refine((val) => /^\d+$/.test(val), {
    message: "",
  })
  .refine((val) => !/^0\d+/.test(val), {
    message: "",
  });

export const dealSchema = z.object({
  dealName: z
    .string()
    .min(2, "მინიმუმ 2 სიმბოლო")
    .max(20, "მაქსიმუმ 20 სიმბოლო"),
  inspectionDays: positiveNumber,
  currency: z.string().nonempty("აირჩიეთ ვალუტა"),
  payer: z.enum(["seller", "buyer", "equal"]),
  shippingDays: positiveNumber,
});

export const itemSchema = z.object({
  itemCategory: z.string().nonempty("აირჩიეთ კატეგორია"),
  itemName: z
    .string()
    .min(2, "მინიმუმ 2 სიმბოლო")
    .max(50, "მაქსიმუმ 50 სიმბოლო"),
  price: positiveNumber,
  itemDescription: z
    .string()
    .min(20, "მინიმუმ 20 სიმბოლო")
    .max(1000, "მაქსიმუმ 1000 სიმბოლო"),
});

export const dealSellerSchema = z.object({
  email: z.string().email("შეიყვანეთ სწორი ელ-ფოსტა"),
});
