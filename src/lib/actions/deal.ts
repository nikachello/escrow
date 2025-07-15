"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { DEAL_STATUS } from "@prisma/client";

async function updateStatus(
  dealId: string,
  status: DEAL_STATUS,
  successMsg: string
) {
  try {
    await prisma.deal.update({
      where: { id: dealId },
      data: { status },
    });

    revalidatePath(`/deals/${dealId}`);
    return { success: successMsg };
  } catch (error) {
    console.error(`${status} შეცდომა:`, error);
    return { error: `${status} შეცდომა. გთხოვთ სცადოთ თავიდან.` };
  }
}

export async function agreeToDeal(prevState: unknown, formData: FormData) {
  const dealId = formData.get("dealId") as string;
  return updateStatus(dealId, "agreed", "თქვენ დაეთანხმეთ გარიგებას!");
}

export async function cancelDeal(prevState: unknown, formData: FormData) {
  const dealId = formData.get("dealId") as string;
  return updateStatus(
    dealId,
    "cancelled",
    "თქვენ წარმატებით გააუქმეთ გარიგება!"
  );
}

export async function payForDeal(prevState: unknown, formData: FormData) {
  const dealId = formData.get("dealId") as string;
  return updateStatus(dealId, "paid", "გადახდა წარმატებით განხორციელდა!");
}

export async function shipDeal(prevState: unknown, formData: FormData) {
  const dealId = formData.get("dealId") as string;
  return updateStatus(dealId, "shipped", "ნივთი მოინიშნა გაგზავნილად!");
}

export async function confirmDelivery(prevState: unknown, formData: FormData) {
  const dealId = formData.get("dealId") as string;
  return updateStatus(dealId, "delivered", "მიღება დადასტურდა წარმატებით!");
}

export async function completeDeal(prevState: unknown, formData: FormData) {
  const dealId = formData.get("dealId") as string;
  return updateStatus(dealId, "completed", "გარიგება დასრულდა წარმატებით!");
}

export async function disputeDeal(prevState: unknown, formData: FormData) {
  const dealId = formData.get("dealId") as string;
  return updateStatus(dealId, "disputed", "გარიგება წარმატებით გასაჩივრდა!");
}
