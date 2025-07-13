import { DealFormData, ItemType } from "@/lib/types/create-deal";
import { Deal } from "@prisma/client";

export interface DealTotals {
  totalItemsPrice: number;
  totalPay: number;
  totalReceivable: number;
}

export interface DealSubmissionData {
  deal: DealFormData;
  items: ItemType[];
  seller: {
    email: string;
  };
  totals: DealTotals;
  currentUserEmail: string | null;
}

export const prepareSubmissionData = (
  dealData: DealFormData,
  items: ItemType[],
  sellerData: { email: string },
  currentUserEmail: string | null,
  totals: DealTotals
): DealSubmissionData => {
  return {
    deal: dealData,
    items,
    seller: sellerData,
    totals,
    currentUserEmail,
  };
};

export const submitDeal = async (
  submissionData: DealSubmissionData
): Promise<Deal> => {
  // TODO: Replace with actual API call
  console.log("Submitting deal:", submissionData);

  // Simulate API call delay

  // In a real implementation, this would be:
  const response = await fetch("/api/deal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submissionData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const saveDealDraft = async (
  submissionData: Partial<DealSubmissionData>
): Promise<void> => {
  // TODO: Implement draft saving functionality
  console.log("Saving draft:", submissionData);

  // This could save to localStorage or send to API
  // localStorage.setItem('dealDraft', JSON.stringify(submissionData));
};
