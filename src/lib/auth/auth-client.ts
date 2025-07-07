import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.BASE_URL!,
  plugins: [
    inferAdditionalFields({
      user: {
        nationalId: {
          type: "string",
          required: true,
        },
        firstName: {
          type: "string",
          required: true,
        },
        lastName: {
          type: "string",
          required: true,
        },
        phone: {
          type: "string",
          required: true,
        },
      },
    }),
  ],
});

export const { signIn, signOut, useSession } = authClient;
