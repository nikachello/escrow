import { z } from "zod";
import { georgianMobilePhoneSchema, nationalIdSchema } from "../validations";

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
    password: z.string().min(8, {
      message: "მინიმუმ 8 სიმბოლო",
    }),
    repeatPassword: z.string().min(8, {
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

export const SignInSchema = z.object({
  email: z.string().email({
    message: "შეიყვანეთ ელ-ფოსტა",
  }),
  password: z.string().min(6, {
    message: "მინიმუმ 6 სიმბოლო",
  }),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "შეიყვანეთ სწორი ელ-ფოსტა" })
    .nonempty({ message: "ელ-ფოსტა სავალდებულოა" }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "მინიმუმ 6 სიმბოლო" })
      .max(20, { message: "მაქსიმუმ 20 სიმბოლო" }),
    confirmPassword: z
      .string()
      .min(8, { message: "მინიმუმ 6 სიმბოლო" })
      .max(20, { message: "მაქსიმუმ 20 სიმბოლო" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "პაროლები არ ემთხვევა",
    path: ["confirmPassword"],
  });
