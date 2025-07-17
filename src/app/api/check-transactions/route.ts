// app/api/check-transactions/route.ts

import { NextResponse } from "next/server";

interface Transaction {
  transactionId: string;
  type: string;
  amount: number;
  senderName?: string;
  description?: string;
  date: string;
}

export async function POST() {
  try {
    const token = await getBOGToken();
    const transactions = await fetchLatestTransactions(token);
    const newPayments = await processNewTransactions(transactions);

    return NextResponse.json({ success: true, newPayments });
  } catch (error) {
    console.error("Transaction check failed:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

async function getBOGToken(): Promise<string> {
  const params = new URLSearchParams();
  params.append("client_id", process.env.BOG_CLIENT_ID || "");
  params.append("client_secret", process.env.BOG_CLIENT_SECRET || "");
  params.append("grant_type", "client_credentials");
  params.append("scope", "bonline");

  const response = await fetch(
    "https://account.bog.ge/auth/realms/bog/protocol/openid-connect/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("BOG token error:", errorText);
    throw new Error(`Failed to authenticate with BOG API: ${response.status}`);
  }

  const data = await response.json();
  console.log("BOG token response:", data); // Optional: log token response

  return data.access_token;
}

async function fetchLatestTransactions(token: string): Promise<Transaction[]> {
  const response = await fetch(
    "https://api.bog.ge/bonline/api/statement/GE29BG0000000000000000/GEL/2025-07-01/2025-07-17",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("response: ", response);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("BOG statement error:", errorText);
    throw new Error(`Failed to fetch transactions: ${response.status}`);
  }

  const data = await response.json();
  console.log("Fetched transactions:", data);

  return data.transactions as Transaction[];
}

async function processNewTransactions(
  transactions: Transaction[]
): Promise<Transaction[]> {
  const newPayments: Transaction[] = [];

  for (const tx of transactions) {
    if (tx.type === "CREDIT") {
      const alreadyProcessed = await checkIfProcessed(tx.transactionId);

      if (!alreadyProcessed) {
        await creditUserBalance(tx);
        await markAsProcessed(tx.transactionId);
        newPayments.push(tx);
      }
    }
  }

  return newPayments;
}

async function checkIfProcessed(transactionId: string): Promise<boolean> {
  return false; // Replace with database check in production
}

async function creditUserBalance(transaction: Transaction): Promise<void> {
  console.log(
    `Crediting user for transaction ${transaction.transactionId} with amount ${transaction.amount}`
  );
  // Implement actual balance update logic
}

async function markAsProcessed(transactionId: string): Promise<void> {
  console.log(`Marking transaction ${transactionId} as processed`);
  // Implement actual database write here
}
