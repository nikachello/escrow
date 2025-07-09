import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  dealSchema,
  itemSchema,
  dealSellerSchema,
  DealFormData,
  ItemType,
  dealSellerData,
} from "@/lib/types/create-deal";

export const useDealForms = () => {
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

  const sellerInfoForm = useForm<dealSellerData>({
    resolver: zodResolver(dealSellerSchema),
    defaultValues: {
      email: "",
    },
  });

  return { dealForm, itemForm, sellerInfoForm };
};
