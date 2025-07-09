import * as z from "zod";

export const dealSchema = z.object({
  dealCategory: z.string().nonempty({
    message: "გთხოვთ აირჩიოთ კატეგორია",
  }),
  userRole: z.string().nonempty({
    message: "გთხოვთ აირჩიოთ ყიდით თუ ყიდულობთ",
  }),
  price: z.string().nonempty({
    message: "შეიყვანეთ თანხა",
  }),
});

export const georgianMobilePhoneSchema = z
  .string()
  .regex(/^(?:\+995)?5\d{8}$/, "შეიყვანეთ სწორი ტელეფონის ნომერი");

export const nationalIdSchema = z
  .string()
  .regex(/^\d{11}$/, "შეიყვანეთ პირადი ნომერი");
