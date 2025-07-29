import { sendEmail } from "@/lib/emailSender";
import { prisma } from "@/lib/prisma";
import { DealSubmissionData } from "@/lib/services/deal-api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as DealSubmissionData;
    const { deal, otherParty, totals, currentUserEmail, items } = body;

    // Validate required values
    if (
      !currentUserEmail ||
      !otherParty?.email ||
      !totals?.totalItemsPrice ||
      !deal?.currency ||
      !deal?.dealName ||
      !totals?.totalPay ||
      !deal?.payer ||
      !deal?.shippingDays ||
      !deal?.inspectionDays ||
      !deal?.creatorRole ||
      !items ||
      !items.length
    ) {
      return NextResponse.json(
        { error: "ინფორმაცია არასრულია." },
        { status: 401 }
      );
    }

    // Prevent self-dealing
    if (currentUserEmail === otherParty.email) {
      return NextResponse.json(
        { error: "თქვენ ვერ შექმნით გარიგებას საკუთარ თავთან." },
        { status: 400 }
      );
    }

    // Resolve roles
    let buyerEmail: string;
    let sellerEmail: string;

    if (deal.creatorRole === "seller") {
      sellerEmail = currentUserEmail;
      buyerEmail = otherParty.email;
    } else {
      buyerEmail = currentUserEmail;
      sellerEmail = otherParty.email;
    }

    // Create deal
    const newDeal = await prisma.deal.create({
      data: {
        buyerEmail,
        sellerEmail,
        amount: totals.totalItemsPrice,
        currency: deal.currency,
        name: deal.dealName,
        sellerReceivable: totals.totalReceivable,
        buyerPay: totals.totalPay,
        whoPays: deal.payer,
        shippingDays: Number(deal.shippingDays),
        inspectionDays: Number(deal.inspectionDays),
        creatorRole: deal.creatorRole,

        items: {
          create: items.map((item) => ({
            name: item.itemName,
            description: item.itemDescription,
            price: Number(item.price),
            category: item.itemCategory,
          })),
        },
      },
    });

    // Notify buyer
    await sendEmail({
      from: "Shuamavali <no-reply@shuamavali.com>",
      to: newDeal.buyerEmail,
      subject: `თქვენთვის შექმენით გარიგება - ${newDeal.name}`,
      text: "თქვენ შექმენით გარიგება, გთხოვთ ეწვიოთ ბმულს.",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>გამარჯობა,</h2>
          <p>თქვენ შექმენით გარიგება პლატფორმა Shuamavali.ge-ზე.</p>
          <p>
            დეტალების სანახავად ეწვიეთ შემდეგ ბმულს:
            <a href="${process.env.BASE_URL}/app/deal/${newDeal.id}" style="color: #4A90E2;">იხილეთ გარიგება</a>
          </p>
          <hr />
          <small>ეს წერილი გამოგზავნილია ავტომატურად. გთხოვთ, არ უპასუხოთ.</small>
        </div>
      `,
    });

    // Invite seller if not registered
    const existingUser = await prisma.user.findUnique({
      where: { email: sellerEmail },
    });

    if (!existingUser) {
      try {
        const invitedUser = await prisma.invitedUser.create({
          data: {
            email: sellerEmail,
            deal: {
              connect: { id: newDeal.id },
            },
          },
        });

        await sendEmail({
          from: "Shuamavali <no-reply@shuamavali.com>",
          to: invitedUser.email,
          subject: `თქვენთვის შეიქმნა გარიგება - ${newDeal.name}`,
          text: "თქვენთვის შეიქმნა გარიგება, გთხოვთ ეწვიოთ ბმულს.",
          html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
              <h2>გამარჯობა,</h2>
              <p>თქვენთვის შეიქმნა გარიგება პლატფორმა Shuamavali.ge-ზე.</p>
              <p>
                დეტალების სანახავად ეწვიეთ შემდეგ ბმულს:
                <a href="${process.env.BASE_URL}/app/deal/${newDeal.id}" style="color: #4A90E2;">იხილეთ გარიგება</a>
              </p>
              <hr />
              <small>ეს წერილი გამოგზავნილია ავტომატურად. გთხოვთ, არ უპასუხოთ.</small>
            </div>
          `,
        });
      } catch (error) {
        console.error("Invited user error:", error);
      }
    }

    return NextResponse.json(newDeal, { status: 201 });
  } catch (error) {
    console.error("გარიგება ვერ შეიქმნა:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
