import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "../emailSender";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        from: "Shuamavali no-reply@shuamavali.com",
        to: user.email,
        subject: "პაროლის აღდგენა",
        text: `დააჭირეთ ლინკს პაროლის აღსადგენად: ${url}`,
        html: `<p>დააჭირეთ <a href=${url}>აქ</a></p>`,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        from: "Shuamavali no-reply@shuamavali.com",
        to: user.email,
        subject: "აქტივაცია Shuamavali.ge-ზე",
        text: `დააჭირეთ ლინკს ემაილის გასააქტიურებლად: ${url}`,
        html: `<p>დააჭირეთ <a href=${url}>აქ</a></p>`,
      });
    },
  },
  user: {
    additionalFields: {
      nationalId: {
        type: "string",
        required: true,
        input: true,
      },
      firstName: {
        type: "string",
        required: true,
        input: true,
      },
      lastName: {
        type: "string",
        required: true,
        input: true,
      },
      phone: {
        type: "string",
        required: true,
        input: true,
      },
    },
  },
  plugins: [nextCookies()],
});
