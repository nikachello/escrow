// app/api/check-transactions/route.ts

import { sendEmail } from "@/lib/emailSender";
import { NextResponse } from "next/server";
import crypto from "crypto";

interface Transaction {
  transactionId: string;
  type: string;
  amount: number;
  senderName?: string;
  description?: string;
  date: string;
  nomination: string | undefined;
}

interface BOGRecord {
  Id: number;
  DocKey: number;
  DocNo: string;
  PostDate: string;
  ValueDate: string;
  EntryType: string;
  EntryComment?: string;
  EntryCommentEn?: string;
  Nomination?: string;
  Credit: number;
  Debit: number;
  Amount: number;
  AmountBase: number;
  PayerName?: string;
  PayerInn?: string;
  Sender?: {
    Name?: string;
    Inn?: string;
    AccountNumber?: string;
    BankCode?: string;
    BankName?: string;
  };
  Beneficiary?: {
    Name?: string;
    Inn?: string | null;
    AccountNumber?: string;
    BankCode?: string;
    BankName?: string;
  };
}

export async function POST() {
  try {
    const token = await getBOGToken();
    const transactions = await fetchLatestTransactions(token);
    // const newPayments = await processNewTransactions(transactions);

    return NextResponse.json({ success: true, transactions });
  } catch (error) {
    console.error("Transaction check failed:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

async function getBOGToken(): Promise<string> {
  try {
    const clientId = process.env.BOG_CLIENT_ID || "";
    const clientSecret = process.env.BOG_CLIENT_SECRET || "";

    const basicAuthToken = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);

    const response = await fetch(
      "https://account.bog.ge/auth/realms/bog/protocol/openid-connect/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${basicAuthToken}`,
        },
        body: params.toString(),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("BOG token error:", errorText);
      throw new Error(
        `Failed to authenticate with BOG API: ${response.status}`
      );
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error in getBOGToken:", error);
    throw error;
  }
}

async function refundTransaction(record: BOGRecord) {
  try {
    const refundPayload = [
      {
        Nomination: "Refund for Order ID: " + (record.Nomination || "Unknown"),
        PayerInn: "01005039192", // Replace with your actual INN
        DispatchType: "MT103",
        ValueDate: new Date().toISOString(),
        UniqueId: crypto.randomUUID(),
        Amount: record.Amount,
        DocumentNo: record.DocNo,
        SourceAccountNumber: "GE73BG0000000609353011GEL",
        BeneficiaryAccountNumber: record.Sender?.AccountNumber,
        BeneficiaryBankCode: record.Sender?.BankCode,
        BeneficiaryInn: record.Sender?.Inn,
        BeneficiaryName: record.Sender?.Name,
        CheckInn: false,
      },
    ];

    const token = await getBOGToken();

    const response = await fetch(
      "https://api.businessonline.ge/api/documents/domestic",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(refundPayload),
      }
    );

    const responseText = await response.text();

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse BOG refund response JSON:", e);
    }

    if (!response.ok) {
      console.error(
        `Refund failed for ${record.Sender?.Name}:`,
        responseData || responseText
      );
    } else {
      console.log("BOG Refund API Response:", responseData);

      if (responseData?.ResultCode !== 0) {
        console.warn(
          "Warning: Refund may not have succeeded completely (ResultCode not 0).",
          responseData
        );
      }

      console.log(`Refunded ${record.Amount} GEL to ${record.Sender?.Name}`);
    }
  } catch (error) {
    console.error(
      `Error in refundTransaction for ${record.Sender?.Name}:`,
      error
    );
  }
}
async function fetchLatestTransactions(token: string): Promise<Transaction[]> {
  try {
    const accountNumber = "GE73BG0000000609353011";
    const currency = "GEL";

    const url = `https://api.businessonline.ge/api/documents/todayactivities/${accountNumber}/${currency}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error("BOG statement error:", responseText);
      throw new Error(`Failed to fetch transactions: ${response.status}`);
    }

    const data = JSON.parse(responseText);
    if (!Array.isArray(data)) {
      throw new Error("Unexpected API response: expected an array.");
    }

    const rawRecords: BOGRecord[] = data;

    for (const record of rawRecords) {
      await refundTransaction(record);
    }

    const transactions: Transaction[] = rawRecords.map((record) => ({
      transactionId: record.DocNo || String(record.Id) || "UNKNOWN",
      type: record.Credit > 0 ? "CREDIT" : "DEBIT",
      amount: record.Credit > 0 ? record.Credit : record.Debit,
      senderName: record.Sender?.Name,
      date: record.PostDate || record.ValueDate,
      nomination: record.Nomination,
    }));

    await sendEmail({
      from: "Shuamavali <no-reply@shuamavali.com>",
      to: "chveni-email@shuamavali.com",
      subject: `ტრანზაქციები`,
      text: "ახალი ტრანზაქციები",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 8px;">გამარჯობა 👋</h2>
          <p style="font-size: 16px;">გთხოვთ, იხილოთ ბოლო  ტრანზაქციების დეტალები:</p>
    
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr>
                <th style="border: 1px solid #ddd; padding: 8px; background-color: #4CAF50; color: white;">ტრანზაქციის ID</th>
                <th style="border: 1px solid #ddd; padding: 8px; background-color: #4CAF50; color: white;">რაოდენობა</th>
                <th style="border: 1px solid #ddd; padding: 8px; background-color: #4CAF50; color: white;">ტიპი</th>
                <th style="border: 1px solid #ddd; padding: 8px; background-color: #4CAF50; color: white;">გამომგზავნი</th>
                <th style="border: 1px solid #ddd; padding: 8px; background-color: #4CAF50; color: white;">დანიშნულება</th>
                <th style="border: 1px solid #ddd; padding: 8px; background-color: #4CAF50; color: white;">თარიღი</th>
              </tr>
            </thead>
            <tbody>
              ${transactions
                .map(
                  (tx) => `
                <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">${tx.transactionId}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${tx.amount} ₾</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${tx.type}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${tx.senderName || "-"}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${tx.nomination || "-"}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${tx.date}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
    
          <p style="font-size: 14px; color: #555;">ეს წერილი გამოგზავნილია ავტომატურად. გთხოვთ, არ უპასუხოთ.</p>
        </div>
      `,
    });

    return transactions;
  } catch (error) {
    console.error("Error in fetchLatestTransactions:", error);
    throw error;
  }
}

// async function processNewTransactions(
//   transactions: Transaction[]
// ): Promise<Transaction[]> {
//   try {
//     const newPayments: Transaction[] = [];

//     for (const tx of transactions) {
//       if (tx.type === "CREDIT") {
//         const alreadyProcessed = await checkIfProcessed(tx.transactionId);

//         if (!alreadyProcessed) {
//           await creditUserBalance(tx);
//           await markAsProcessed(tx.transactionId);
//           newPayments.push(tx);
//         }
//       }
//     }

//     return newPayments;
//   } catch (error) {
//     console.error("Error in processNewTransactions:", error);
//     throw error;
//   }
// }

// async function checkIfProcessed(transactionId: string): Promise<boolean> {
//   try {
//     return false; // Replace with actual database check
//   } catch (error) {
//     console.error(`Error in checkIfProcessed for ${transactionId}:`, error);
//     throw error;
//   }
// }

// async function creditUserBalance(transaction: Transaction): Promise<void> {
//   try {
//     console.log(
//       `Crediting user for transaction ${transaction.transactionId} with amount ${transaction.amount}`
//     );
//     // Replace this with actual business logic
//   } catch (error) {
//     console.error(
//       `Error in creditUserBalance for ${transaction.transactionId}:`,
//       error
//     );
//     throw error;
//   }
// }

// async function markAsProcessed(transactionId: string): Promise<void> {
//   try {
//     console.log(`Marking transaction ${transactionId} as processed`);
//     // Replace this with actual database logic
//   } catch (error) {
//     console.error(`Error in markAsProcessed for ${transactionId}:`, error);
//     throw error;
//   }
// }
