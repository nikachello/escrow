export type DealStatus =
  | "pending"
  | "agreed"
  | "paid"
  | "shipped"
  | "delivered"
  | "completed"
  | "cancelled";
export type UserRole = "buyer" | "seller";

export type TimeLineStatus =
  | "agreement"
  | "payment"
  | "delivery"
  | "inspection"
  | "closed";

export interface DealStatusConfig {
  title: string;
  description: string;
  badge?: {
    text: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  };
  actions?: {
    label: string;
    variant: "default" | "destructive" | "outline" | "secondary";
    action: DealAction;
  }[];
  timelineStatus: TimeLineStatus;
}

export type DealAction =
  | "agree"
  | "cancel"
  | "pay"
  | "ship"
  | "confirm_delivery"
  | "complete"
  | "dispute";
