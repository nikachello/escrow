import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  dealSchema,
  itemSchema,
  dealOtherPartySchema,
  DealFormData,
  ItemType,
  OtherPartyData,
} from "@/lib/types/create-deal";

export const useDealForms = () => {
  const dealForm = useForm<DealFormData>({
    resolver: zodResolver(dealSchema),
    mode: "onChange",
    defaultValues: {
      dealName: "",
      inspectionDays: "",
      currency: "lari",
      payer: "buyer",
      shippingDays: "",
    },
  });

  const itemForm = useForm<ItemType>({
    resolver: zodResolver(itemSchema),
    mode: "onChange",
    defaultValues: {
      itemCategory: "1",
      itemName: "",
      price: "",
      itemDescription: "",
    },
  });

  const otherPartyInfoForm = useForm<OtherPartyData>({
    resolver: zodResolver(dealOtherPartySchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  return { dealForm, itemForm, otherPartyInfoForm };
};
