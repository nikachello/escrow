// import { agreeToDeal } from "@/app/app/deal/[dealId]/page";
import {
  agreeToDeal,
  cancelDeal,
  completeDeal,
  confirmDelivery,
  disputeDeal,
  payForDeal,
  shipDeal,
} from "../actions/deal";
import { dealStatusConfig } from "../config/deal";
import { DealStatus, DealStatusConfig, UserRole } from "../types/deal";

export const actionHandlers = {
  agree: agreeToDeal,
  cancel: cancelDeal,
  pay: payForDeal,
  ship: shipDeal,
  confirm_delivery: confirmDelivery,
  complete: completeDeal,
  dispute: disputeDeal,
};

// Helper function to get current config

export function getDealConfig(
  status: DealStatus,
  currentUserEmail: string,
  creatorEmail: string,
  creatorRole: UserRole
): DealStatusConfig {
  const normalize = (email: string) => email.trim().toLowerCase();

  const isCreator = normalize(currentUserEmail) === normalize(creatorEmail);

  // Infer userRole based on perspective
  let roleToUse: UserRole;

  if (status === "pending") {
    // Flip for pending: recipient must act
    roleToUse = isCreator
      ? creatorRole === "buyer"
        ? "seller"
        : "buyer"
      : creatorRole;
  } else {
    // After agreement, roles act as-is
    roleToUse =
      normalize(currentUserEmail) === normalize(creatorEmail)
        ? creatorRole
        : creatorRole === "buyer"
          ? "seller"
          : "buyer";
  }

  // ✅ Now TypeScript knows roleToUse is of type UserRole
  return dealStatusConfig[status][roleToUse];
}
