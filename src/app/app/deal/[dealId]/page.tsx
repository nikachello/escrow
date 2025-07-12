import { EscrowTimeline } from "@/components/primary/features/deal/components/EscrowTimeline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { DealStatus, DealStatusConfig, UserRole } from "@/lib/types/deal";
import { dealStatusConfig } from "@/lib/config/deal";

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
  role: UserRole
): DealStatusConfig {
  return dealStatusConfig[status][role];
}

// Your existing server actions stay the same
export async function agreeToDeal(dealId: string) {
  "use server";
  // ... your existing implementation
}

export async function cancelDeal(dealId: string) {
  "use server";
  // ... your existing implementation
}

// Add other action handlers as needed
export async function payForDeal(dealId: string) {
  "use server";
  // Implementation for payment
}

async function shipDeal(dealId: string) {
  "use server";
  // Implementation for shipping
}

async function confirmDelivery(dealId: string) {
  "use server";
  // Implementation for delivery confirmation
}

async function completeDeal(dealId: string) {
  "use server";
  // Implementation for completion
}

async function disputeDeal(dealId: string) {
  "use server";
  // Implementation for dispute
}

export default async function DealPage({
  params,
}: {
  params: { dealId: string };
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user.email || !session.user.emailVerified) {
    return redirect("/?mail-not-verified");
  }

  const deal = await prisma.deal.findUnique({
    where: { id: params.dealId },
    include: {
      items: true,
    },
  });

  if (!deal) {
    return redirect("/?error=no-deal-found");
  }

  // Check if logged in user is related to deal (buyer or seller)
  const normalizeEmail = (email?: string | null) =>
    (email ?? "").trim().toLowerCase();

  const userEmail = normalizeEmail(session.user.email);
  const buyerEmail = normalizeEmail(deal.buyerEmail);
  const sellerEmail = normalizeEmail(deal.sellerEmail);

  if (userEmail !== buyerEmail && userEmail !== sellerEmail) {
    return redirect("/?error=not-authorized");
  }

  const role: UserRole = userEmail === buyerEmail ? "buyer" : "seller";
  const status = deal.status as DealStatus;

  // Get configuration for current status and role
  const config = getDealConfig(status, role);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
      <Card className="w-full overflow-hidden">
        <CardHeader className="font-heading px-4 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl tracking-wide break-words">
            {deal.name}
          </CardTitle>
          <CardDescription className="space-y-3">
            <div className="space-y-2 text-sm">
              <p className="break-words">გარიგება {deal.id}</p>
              <p className="break-words">
                <strong className="break-all">{deal.buyerEmail}</strong>{" "}
                ყიდულობს {deal.items.length} ნივთს{" "}
                <strong className="break-all">{deal.sellerEmail}</strong> - სგან
              </p>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="w-full">
            <EscrowTimeline currentStatus={config.timelineStatus} />

            {config.badge && (
              <Badge
                variant={config.badge.variant}
                className="px-2 py-1 text-gray-500"
              >
                {config.badge.text}
              </Badge>
            )}
          </div>

          <div className="border rounded-md p-4 mt-6">
            <div>
              <h2 className="font-heading font-bold text-lg">{config.title}</h2>
              <p className="text-sm tracking-wide">{config.description}</p>

              {config.actions && config.actions.length > 0 && (
                <div className="mt-4 flex gap-4">
                  {config.actions.map((action, index) => (
                    <form
                      key={index}
                      action={actionHandlers[
                        action.action as keyof typeof actionHandlers
                      ]?.bind(null, deal.id)}
                    >
                      <Button type="submit" variant={action.variant}>
                        {action.label}
                      </Button>
                    </form>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
