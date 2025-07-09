import { DealFormData, ItemType } from "@/lib/types/create-deal";
import { calculateTotals } from "@/lib/utils/calculateTotals";

export interface DealSubmissionData {
  deal: DealFormData;
  items: ItemType[];
  seller: {
    email: string;
  };
  totals: {
    totalItemsPrice: number;
    totalPay: number;
    totalReceivable: number;
  };
}

export const prepareSubmissionData = (
  dealData: DealFormData,
  items: ItemType[],
  sellerData: { email: string }
): DealSubmissionData => {
  const totals = calculateTotals(items, dealData);

  return {
    deal: dealData,
    items,
    seller: sellerData,
    totals,
  };
};

export const submitDeal = async (
  submissionData: DealSubmissionData
): Promise<void> => {
  // TODO: Replace with actual API call
  console.log("Submitting deal:", submissionData);

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate potential API errors (for testing)
  if (Math.random() < 0.1) {
    // 10% chance of error
    throw new Error("API Error: Failed to submit deal");
  }

  // In a real implementation, this would be:
  // const response = await fetch('/api/deals', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(submissionData),
  // });
  //
  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`);
  // }
  //
  // return await response.json();
};

export const saveDealDraft = async (
  submissionData: Partial<DealSubmissionData>
): Promise<void> => {
  // TODO: Implement draft saving functionality
  console.log("Saving draft:", submissionData);

  // This could save to localStorage or send to API
  // localStorage.setItem('dealDraft', JSON.stringify(submissionData));
};
