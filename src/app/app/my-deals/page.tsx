"use server";
import React from "react";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DealTable from "@/components/primary/features/my-deals/components/DealTable";

export default async function Page() {
  // Check user
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const userId = session.user.id;
  const userEmail = session?.user.email;

  if (!userId || !userEmail) {
    redirect("/");
  }

  const sellerDeals = await prisma.deal.findMany({
    where: {
      sellerEmail: userEmail,
      status: "completed", // or: { in: ["completed", "delivered", "paid"] }
    },
  });

  const deals = await prisma.deal.findMany({
    where: {
      OR: [{ buyerEmail: userEmail }, { sellerEmail: userEmail }],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <DealTable
        deals={deals}
        userEmail={userEmail}
        sellerDeals={sellerDeals}
      />
    </div>
  );
}
