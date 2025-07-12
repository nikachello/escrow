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

  console.log({ userEmail, buyerEmail, sellerEmail }); // Debug output

  if (userEmail !== buyerEmail && userEmail !== sellerEmail) {
    console.log("Unauthorized: ", { userEmail, buyerEmail, sellerEmail });
    return redirect("/?error=not-authorized");
  }

  const role = userEmail === buyerEmail ? "buyer" : "seller";

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
            <EscrowTimeline currentStatus="agreement" />
            <Badge variant="secondary" className="px-2 py-1 text-gray-500">
              ● სჭირდება დათანხმება
            </Badge>
          </div>
          <div className="border rounded-md p-4 mt-6">
            {role === "buyer" ? (
              <div>
                <h2 className="font-heading font-bold text-lg">
                  ველოდებით გამყიდველის თანხმობას
                </h2>
                <p className="text-sm tracking-wide">
                  მას შემდეგ რაც გამყიდველი გადახედავს გარიგებას, მას შეუძლია
                  დაეთანხმოს ან გააუქმოს ის. გადაწყვეტილებას ელ-ფოსტაზე მიიღებთ
                </p>
              </div>
            ) : (
              <div>
                <h2 className="font-heading font-bold text-lg">
                  განიხილეთ და დაეთანხმეთ გარიგებას
                </h2>
                <p className="text-sm tracking-wide">
                  მყიდველმა შექმნა გარიგება, გთხოვთ გადაავლეთ თვალი და
                  დაეთანხმეთ მას
                </p>
                <div className="mt-4 flex gap-8">
                  <Button variant="default">დათანხმება</Button>
                  <Button variant="destructive">გარიგების გაუქმება</Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
