import { sendEmail } from "@/lib/emailSender";
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

    const existingUser = await prisma.user.findUnique({
      where: { email: seller.email },
    });

    if (!existingUser) {
      try {
        const invitedUser = await prisma.invitedUser.create({
          data: {
            email: seller.email,
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
                <a href="${process.env.BASE_URL}/app/deal/${newDeal.id} style="color: #4A90E2;">იხილეთ გარიგება</a>
              </p>
              <hr />
              <small>ეს წერილი გამოგზავნილია ავტომატურად. გთხოვთ, არ უპასუხოთ.</small>
            </div>
          `,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      //
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
