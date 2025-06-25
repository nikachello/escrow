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
