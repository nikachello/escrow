import { prisma } from "@/lib/prisma";
import { DealSubmissionData } from "@/lib/services/deal-api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as DealSubmissionData;
    const { deal, seller, totals, currentUserEmail, items } = body;

    if (
      // buyer email
      !currentUserEmail ||
      !seller.email ||
      // amount without our service fee
      !totals?.totalItemsPrice ||
      !deal?.currency ||
      !deal?.dealName ||
      !totals?.totalPay ||
      !totals?.totalPay ||
      !deal?.payer ||
      !deal?.shippingDays ||
      !deal?.inspectionDays ||
      !items
    ) {
      return NextResponse.json(
        { error: "ინფორმაცია არასრულია." },
        { status: 401 }
      );
    }

    console.log(items);
    const newDeal = await prisma.deal.create({
      data: {
        buyerEmail: currentUserEmail,
        sellerEmail: seller.email,
        amount: totals.totalItemsPrice,
        currency: deal.currency,
        name: deal.dealName,
        sellerReceivable: totals.totalReceivable,
        buyerPay: totals.totalPay,
        whoPays: deal.payer,
        shippingDays: deal.shippingDays,
        inspectionDays: deal.inspectionDays,

        items: {
          create: items.map((item) => ({
            name: item.itemName,
            description: item.itemDescription,
            price: item.price,
            category: item.itemCategory,
          })),
        },
      },
    });

    return NextResponse.json(newDeal, { status: 201 });
  } catch (error) {
    console.error("გარიგება ვერ შეიქმნა:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
