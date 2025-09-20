import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import { DealFormData, OtherPartyData, ItemType } from "../types/create-deal";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

export const validateDealDetails = async (
  dealForm: UseFormReturn<DealFormData>
): Promise<boolean> => {
  const isValid = await dealForm.trigger();
  const t = useTranslations("Validations");
  if (!isValid) {
    toast.error(t("deal_details_required"));
  }
  return isValid;
};

export const validateItemForm = async (
  itemForm: UseFormReturn<ItemType>
): Promise<boolean> => {
  return await itemForm.trigger();
};

export const validateOtherPartyInfo = async (
  sellerInfoForm: UseFormReturn<OtherPartyData>
): Promise<boolean> => {
  const isValid = await sellerInfoForm.trigger();
  const t = useTranslations("ProfilePage");
  if (!isValid) {
    toast.error(t("seller_email_required"));
  }
  return isValid;
};

export const validateEmailMismatch = async (
  sellerEmail: string,
  currentUserEmail: string | null
): Promise<boolean> => {
  if (currentUserEmail && sellerEmail === currentUserEmail) {
    const t = useTranslations("ProfilePage");
    toast.error(t("email_mismatch"));
    return false;
  }
  return true;
};

export const validateItemsExist = async (
  itemsCount: number
): Promise<boolean> => {
  if (itemsCount === 0) {
    const t = useTranslations("ProfilePage");

    toast.error(t("min_one_item"));
    return false;
  }
  return true;
};

export const validateAllForSubmission = async (
  dealForm: UseFormReturn<DealFormData>,
  otherPartyInfoForm: UseFormReturn<OtherPartyData>,
  itemsCount: number,
  sellerEmail: string,
  currentUserEmail: string | null,
  totals: object
): Promise<boolean> => {
  console.log(dealForm);
  console.log(totals);
  // Check if items exist
  if (!validateItemsExist(itemsCount)) {
    return false;
  }

  // Validate seller info
  if (!(await validateOtherPartyInfo(otherPartyInfoForm))) {
    return false;
  }

  // Check email mismatch
  if (!validateEmailMismatch(sellerEmail, currentUserEmail)) {
    return false;
  }

  return true;
};
