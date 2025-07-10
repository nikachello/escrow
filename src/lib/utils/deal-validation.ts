import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { FORM_MESSAGES } from "@/lib/constants/form-messages";
import { DealFormData, dealSellerData, ItemType } from "../types/create-deal";

export const validateDealDetails = async (
  dealForm: UseFormReturn<DealFormData>
): Promise<boolean> => {
  const isValid = await dealForm.trigger();
  if (!isValid) {
    toast.error(FORM_MESSAGES.DEAL_DETAILS_REQUIRED);
  }
  return isValid;
};

export const validateItemForm = async (
  itemForm: UseFormReturn<ItemType>
): Promise<boolean> => {
  return await itemForm.trigger();
};

export const validateSellerInfo = async (
  sellerInfoForm: UseFormReturn<dealSellerData>
): Promise<boolean> => {
  const isValid = await sellerInfoForm.trigger();
  if (!isValid) {
    toast.error(FORM_MESSAGES.SELLER_EMAIL_REQUIRED);
  }
  return isValid;
};

export const validateEmailMismatch = (
  sellerEmail: string,
  currentUserEmail: string | null
): boolean => {
  if (currentUserEmail && sellerEmail === currentUserEmail) {
    toast.error(FORM_MESSAGES.EMAIL_MISMATCH);
    return false;
  }
  return true;
};

export const validateItemsExist = (itemsCount: number): boolean => {
  if (itemsCount === 0) {
    toast.error(FORM_MESSAGES.MIN_ONE_ITEM);
    return false;
  }
  return true;
};

export const validateAllForSubmission = async (
  dealForm: UseFormReturn<DealFormData>,
  sellerInfoForm: UseFormReturn<dealSellerData>,
  itemsCount: number,
  sellerEmail: string,
  currentUserEmail: string | null,
  totals: {}
): Promise<boolean> => {
  // Check if items exist
  if (!validateItemsExist(itemsCount)) {
    return false;
  }

  // Validate seller info
  if (!(await validateSellerInfo(sellerInfoForm))) {
    return false;
  }

  // Check email mismatch
  if (!validateEmailMismatch(sellerEmail, currentUserEmail)) {
    return false;
  }

  return true;
};
