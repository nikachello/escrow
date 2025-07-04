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

const georgianMobilePhoneSchema = z
  .string()
  .regex(/^(?:\+995)?5\d{8}$/, "შეიყვანეთ სწორი ტელეფონის ნომერი");

const nationalIdSchema = z
  .string()
  .regex(/^\d{11}$/, "შეიყვანეთ პირადი ნომერი");

export const signUpSchema = z
  .object({
    nationalId: nationalIdSchema,
    firstName: z.string().nonempty({
      message: "შეიყვანეთ სახელი",
    }),
    lastName: z.string().nonempty({
      message: "შეიყვანეთ გვარი",
    }),
    email: z.string().email({
      message: "შეიყვანეთ ელ-ფოსტა",
    }),
    phone: georgianMobilePhoneSchema,
    password: z.string().min(6, {
      message: "მინიმუმ 6 სიმბოლო",
    }),
    repeatPassword: z.string().min(6, {
      message: "გაიმეორეთ პაროლი სწორად",
    }),
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword) {
      ctx.addIssue({
        code: "custom",
        message: "პაროლები არ ემთხვევა",
        path: ["repeatPassword"],
      });
    }
  });
