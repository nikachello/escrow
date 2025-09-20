import FileUpload from "@/components/primary/FileUpload";
import { DealStatus, DealStatusConfig, UserRole } from "../types/deal";
import { getTranslations } from "next-intl/server";

export async function getDealStatusConfig() {
  const t = await getTranslations("DealStatus");

  const config: Record<DealStatus, Record<UserRole, DealStatusConfig>> = {
    pending: {
      buyer: {
        title: t("pending.buyer.title"),
        description: t("pending.buyer.description"),
        badge: {
          text: t("pending.buyer.badge"),
          variant: "secondary",
        },
        timelineStatus: "agreement",
      },
      seller: {
        title: t("pending.seller.title"),
        description: t("pending.seller.description"),
        badge: {
          text: t("pending.seller.badge"),
          variant: "secondary",
        },
        actions: [
          {
            label: t("pending.seller.actions.agree"),
            variant: "default",
            action: "agree",
          },
          {
            label: t("pending.seller.actions.cancel"),
            variant: "destructive",
            action: "cancel",
          },
        ],
        timelineStatus: "agreement",
      },
    },

    agreed: {
      buyer: {
        title: t("agreed.buyer.title"),
        description: t("agreed.buyer.description"),
        badge: {
          text: t("agreed.buyer.badge"),
          variant: "secondary",
        },
        actions: [
          {
            label: t("agreed.buyer.actions.pay"),
            variant: "default",
            action: "pay",
          },
        ],
        timelineStatus: "payment",
      },
      seller: {
        title: t("agreed.seller.title"),
        description: t("agreed.seller.description"),
        badge: {
          text: t("agreed.seller.badge"),
          variant: "secondary",
        },
        timelineStatus: "payment",
      },
    },

    paid: {
      buyer: {
        title: t("paid.buyer.title"),
        description: t("paid.buyer.description"),
        badge: {
          text: t("paid.buyer.badge"),
          variant: "secondary",
        },
        timelineStatus: "delivery",
      },
      seller: {
        title: t("paid.seller.title"),
        description: t("paid.seller.description"),
        badge: {
          text: t("paid.seller.badge"),
          variant: "secondary",
        },
        customComponent: FileUpload,
        timelineStatus: "delivery",
      },
    },

    shipped: {
      buyer: {
        title: t("shipped.buyer.title"),
        description: t("shipped.buyer.description"),
        badge: {
          text: t("shipped.buyer.badge"),
          variant: "secondary",
        },
        actions: [
          {
            label: t("shipped.buyer.actions.confirmDelivery"),
            variant: "default",
            action: "confirm_delivery",
          },
        ],
        timelineStatus: "delivery",
      },
      seller: {
        title: t("shipped.seller.title"),
        description: t("shipped.seller.description"),
        badge: {
          text: t("shipped.seller.badge"),
          variant: "secondary",
        },
        timelineStatus: "delivery",
      },
    },

    delivered: {
      buyer: {
        title: t("delivered.buyer.title"),
        description: t("delivered.buyer.description"),
        badge: {
          text: t("delivered.buyer.badge"),
          variant: "secondary",
        },
        actions: [
          {
            label: t("delivered.buyer.actions.confirm"),
            variant: "default",
            action: "complete",
          },
        ],
        timelineStatus: "closed",
      },
      seller: {
        title: t("delivered.seller.title"),
        description: t("delivered.seller.description"),
        badge: {
          text: t("delivered.seller.badge"),
          variant: "secondary",
        },
        timelineStatus: "closed",
      },
    },

    completed: {
      buyer: {
        title: t("completed.buyer.title"),
        description: t("completed.buyer.description"),
        badge: {
          text: t("completed.buyer.badge"),
          variant: "secondary",
        },
        timelineStatus: "closed",
      },
      seller: {
        title: t("completed.seller.title"),
        description: t("completed.seller.description"),
        badge: {
          text: t("completed.seller.badge"),
          variant: "secondary",
        },
        timelineStatus: "closed",
      },
    },

    cancelled: {
      buyer: {
        title: t("cancelled.buyer.title"),
        description: t("cancelled.buyer.description"),
        badge: {
          text: t("cancelled.buyer.badge"),
          variant: "destructive",
        },
        timelineStatus: "closed",
      },
      seller: {
        title: t("cancelled.seller.title"),
        description: t("cancelled.seller.description"),
        badge: {
          text: t("cancelled.seller.badge"),
          variant: "destructive",
        },
        timelineStatus: "closed",
      },
    },

    disputed: {
      buyer: {
        title: t("disputed.buyer.title"),
        description: t("disputed.buyer.description"),
        badge: {
          text: t("disputed.buyer.badge"),
          variant: "destructive",
        },
        timelineStatus: "closed",
      },
      seller: {
        title: t("disputed.seller.title"),
        description: t("disputed.seller.description"),
        badge: {
          text: t("disputed.seller.badge"),
          variant: "destructive",
        },
        timelineStatus: "closed",
      },
    },
  };

  return config;
}
