// import { agreeToDeal } from "@/app/app/deal/[dealId]/page";
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
