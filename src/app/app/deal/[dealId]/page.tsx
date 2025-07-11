import { EscrowTimeline } from "@/components/primary/features/deal/components/EscrowTimeline";
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

export default async function DealPage({
  params,
}: {
  params: { dealId: string };
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // gavigot user shemosulia tu ara, users akvs tu ara maili verificerebuli
  if (!session || !session.user.email || !session.user.emailVerified) {
    return redirect("/");
  }

  const deal = await prisma.deal.findUnique({
    where: { id: params.dealId },
    include: {
      items: true,
    },
  });

  if (!deal) {
    return redirect("/");
  }

  // Check if logged in user is related to deal (buyer or seller)
  const userEmail = session.user.email.toLowerCase();
  if (
    userEmail !== deal.buyerEmail.toLowerCase() &&
    userEmail !== deal.sellerEmail.toLowerCase()
  ) {
    // Optionally render 403 page or redirect
    return redirect("/"); // or throw new Error("Unauthorized");
  }

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
            <div className="w-full">
              <EscrowTimeline currentStatus="closed" />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">asdasd</CardContent>
      </Card>
    </div>
  );
}
