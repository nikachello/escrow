import * as z from "zod";

export const dealSchema = z.object({
  dealName: z.string().nonempty({
    message: "შეიყვანეთ გარიგების სახელი",
  }),
  shippingDays: z.string().nonempty({
    message: "შეიყვანეთ ტრანსპორტირების დღეები",
  }),
});

export const georgianMobilePhoneSchema = z
  .string()
  .regex(/^(?:\+995)?5\d{8}$/, "შეიყვანეთ სწორი ტელეფონის ნომერი");

export const nationalIdSchema = z
  .string()
  .regex(/^\d{11}$/, "შეიყვანეთ პირადი ნომერი");
