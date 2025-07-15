import { dealStatusConfig } from "../config/deal";
import { DealStatus, DealStatusConfig, UserRole } from "../types/deal";

// export const actionHandlers = {
//   agree: agreeToDeal,
//   cancel: cancelDeal,
//   pay: payForDeal,
//   ship: shipDeal,
//   confirm_delivery: confirmDelivery,
//   complete: completeDeal,
//   dispute: disputeDeal,
// };

// Helper function to get current config
export function getDealConfig(
  status: DealStatus,
  role: UserRole
): DealStatusConfig {
  return dealStatusConfig[status][role];
}

// // Your existing server actions stay the same
// export async function agreeToDeal(dealId: string) {
//   "use server";
//   // ... your existing implementation
// }

// export async function cancelDeal(dealId: string) {
//   "use server";
//   // ... your existing implementation
// }

// // Add other action handlers as needed
// export async function payForDeal(dealId: string) {
//   "use server";
//   // Implementation for payment
// }

// async function shipDeal(dealId: string) {
//   "use server";
//   // Implementation for shipping
// }

// async function confirmDelivery(dealId: string) {
//   "use server";
//   // Implementation for delivery confirmation
// }

// async function completeDeal(dealId: string) {
//   "use server";
//   // Implementation for completion
// }

// async function disputeDeal(dealId: string) {
//   "use server";
//   // Implementation for dispute
// }
