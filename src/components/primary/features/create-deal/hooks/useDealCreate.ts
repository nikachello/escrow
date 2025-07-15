"use client";
import { useState, useCallback } from "react";
import { toast } from "sonner";

import { useDealForms } from "@/hooks/useDealForms";

import { calculateTotals } from "@/lib/utils/calculateTotals";

import { DealFormData } from "@/lib/types/create-deal";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useCurrency } from "@/hooks/useCurrency";
import { useItems } from "./useItems";
import {
  validateAllForSubmission,
  validateDealDetails,
  validateItemForm,
} from "@/lib/utils/deal-validation";
import { FORM_MESSAGES } from "@/lib/constants/form-messages";
import { prepareSubmissionData, submitDeal } from "@/lib/services/deal-api";
import { useRouter } from "nextjs-toploader/app";

export const useDealCreate = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  // Custom hooks
  const { currentUserEmail, loadingSession } = useCurrentUser();
  const { dealForm, itemForm, sellerInfoForm } = useDealForms();
  const { currencySymbol } = useCurrency(dealForm);
  const { items, addItem, removeItem, clearItems, hasItems } = useItems();

  // Computed values
  const formDisabled = hasItems;
  const totals = calculateTotals(items, dealForm.getValues());

  // Handlers
  const handleAddItem = useCallback(async () => {
    if (!(await validateDealDetails(dealForm))) return;
    if (!(await validateItemForm(itemForm))) return;

    const newItem = itemForm.getValues();
    addItem(newItem);
    itemForm.reset();
    toast.success(FORM_MESSAGES.ITEM_ADDED);
  }, [dealForm, itemForm, addItem]);

  const handleRemoveItem = useCallback(
    (index: number) => {
      removeItem(index);
      toast.info(FORM_MESSAGES.ITEM_REMOVED);
    },
    [removeItem]
  );

  const resetAllForms = useCallback(() => {
    dealForm.reset();
    itemForm.reset();
    sellerInfoForm.reset();
    clearItems();
  }, [dealForm, itemForm, sellerInfoForm, clearItems]);

  const handleSubmit = useCallback(
    async (values: DealFormData) => {
      const sellerData = sellerInfoForm.getValues();

      const isValid = await validateAllForSubmission(
        dealForm,
        sellerInfoForm,
        items.length,
        sellerData.email,
        currentUserEmail,
        totals
      );

      if (!isValid) return;

      setSubmitting(true);

      try {
        const submissionData = prepareSubmissionData(
          values,
          items,
          sellerData,
          currentUserEmail,
          totals
        );
        const deal = await submitDeal(submissionData);

        toast.success(FORM_MESSAGES.SUBMISSION_SUCCESS);
        resetAllForms();

        router.push(`/app/deal/${deal.id}`);
      } catch (error) {
        console.error("Submission error:", error);
        toast.error(FORM_MESSAGES.SUBMISSION_ERROR);
      } finally {
        setSubmitting(false);
      }
    },
    [items, currentUserEmail, sellerInfoForm, resetAllForms, dealForm]
  );

  return {
    // State
    state: {
      loadingSession,
      submitting,
      formDisabled,
      hasItems,
    },

    // Forms
    forms: {
      dealForm,
      itemForm,
      sellerInfoForm,
      totals,
      currentUserEmail,
    },

    // Data
    data: {
      items,
      currencySymbol,
      totals,
      currentUserEmail,
    },

    // Handlers
    handlers: {
      handleAddItem,
      handleRemoveItem,
      handleSubmit,
      resetAllForms,
    },
  };
};
