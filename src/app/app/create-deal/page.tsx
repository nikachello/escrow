import { DealCreatePage } from "@/components/primary/features/create-deal";

import React from "react";

const page = () => {
  return <DealCreatePage />;
};

export default page;

// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Form } from "@/components/ui/form";
// import { toast } from "sonner";
// import DealDetailsForm from "@/components/primary/forms/create-deal/DealDetailsForm";
// import ItemForm from "@/components/primary/forms/create-deal/ItemForm";
// import ItemsList from "@/components/primary/forms/create-deal/ItemList";
// import { DEAL_CATEGORIES } from "@/lib/constants";
// import DealTotal from "@/components/primary/forms/create-deal/DealTotal";
// import {
//   DealFormData,
//   dealSchema,
//   dealSellerData,
//   dealSellerSchema,
//   itemSchema,
//   ItemType,
//   Payer,
// } from "@/lib/types/create-deal";
// import { CURRENCIES } from "@/lib/constants/create-deal";
// import SellerInfoForm from "@/components/primary/forms/create-deal/SellerForm";
// import { useDealForms } from "@/hooks/useDealForms";
// import { getCurrentUserEmail } from "@/lib/auth/session-utils";
// import { calculateTotals } from "@/lib/utils/calculateTotals";

// type Totals = {
//   totalItemsPrice: number;
//   totalPay: number;
//   totalReceivable: number;
// };

// const roundToTwo = (num: number) => Math.round(num * 100) / 100;

// const DealCreatePage: React.FC = () => {
//   const [currencySymbol, setCurrencySymbol] = useState("₾");
//   const [items, setItems] = useState<ItemType[]>([]);
//   const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
//   const [loadingSession, setLoadingSession] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   // amovigot logged in momxmareblis mail
//   useEffect(() => {
//     let isMounted = true;
//     getCurrentUserEmail()
//       .then((email) => {
//         if (isMounted) setCurrentUserEmail(email);
//       })
//       .finally(() => {
//         if (isMounted) setLoadingSession(false);
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const { dealForm, itemForm, sellerInfoForm } = useDealForms();

//   const formDisabled = items.length > 0;

//   // Update currency symbol when currency changes
//   useEffect(() => {
//     const subscription = dealForm.watch((value) => {
//       const currency = CURRENCIES.find((c) => c.id === value.currency);
//       setCurrencySymbol(currency?.symbol ?? "₾");
//     });
//     return () => subscription.unsubscribe();
//   }, [dealForm]);

//   // Add item handler with validation and UX feedback
//   const handleAddItem = useCallback(async () => {
//     const isDealValid = await dealForm.trigger();
//     if (!isDealValid) {
//       toast.error("გთხოვთ შეავსოთ გარიგების დეტალები სრულად");
//       return;
//     }

//     const isItemValid = await itemForm.trigger();
//     if (!isItemValid) return;

//     const newItem = itemForm.getValues();
//     setItems((prev) => [...prev, newItem]);
//     itemForm.reset();
//     toast.success("ნივთი დამატებულია");
//   }, [dealForm, itemForm]);

//   // Remove item handler
//   const handleRemoveItem = useCallback((index: number) => {
//     setItems((prev) => prev.filter((_, i) => i !== index));
//     toast.info("ნივთი წაიშალა");
//   }, []);

//   // Submit handler with validation, security check, and UX improvements
//   const handleSubmit = useCallback(
//     async (values: DealFormData) => {
//       if (items.length === 0) {
//         toast.error("გთხოვთ დაამატოთ მინიმუმ ერთი ნივთი");
//         return;
//       }

//       const isSellerValid = await sellerInfoForm.trigger();
//       if (!isSellerValid) {
//         toast.error("გთხოვთ შეიყვანოთ გამყიდველის ელ-ფოსტა");
//         return;
//       }

//       const sellerData = sellerInfoForm.getValues();

//       if (currentUserEmail && sellerData.email === currentUserEmail) {
//         toast.error("გამყიდველის და თქვენი მეილი არ უნდა ემთხვეოდეს!");
//         return;
//       }

//       setSubmitting(true);

//       try {
//         const formData = { ...values, items, seller: sellerData };
//         const totals = calculateTotals(items, values);
//         const submissionData = { ...formData, totals };

//         // TODO: Replace alert with real API call
//         console.log("Submitting deal:", submissionData);
//         alert("გარიგება წარმატებით გაიგზავნა!");

//         // Reset forms and state after successful submission
//         dealForm.reset();
//         itemForm.reset();
//         sellerInfoForm.reset();
//         setItems([]);
//       } catch (error) {
//         console.error("Submission error:", error);
//         toast.error("შეცდომა მოხდა, სცადეთ თავიდან");
//       } finally {
//         setSubmitting(false);
//       }
//     },
//     [items, currentUserEmail, dealForm, itemForm, sellerInfoForm]
//   );

//   // Calculate totals for current state
//   const totals = calculateTotals(items, dealForm.getValues());

//   if (loadingSession) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-lg text-gray-500">დაელოდეთ...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6 max-w-3xl">
//       <Card className="shadow-lg rounded-lg">
//         <CardHeader>
//           <CardTitle className="text-3xl font-bold tracking-tight">
//             შექმენით გარიგება
//           </CardTitle>
//           <CardDescription className="text-gray-600 dark:text-gray-400">
//             შეიყვანეთ ყველა დეტალი ზუსტად და ყურადღებით
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <Form {...dealForm}>
//             <form
//               onSubmit={dealForm.handleSubmit(handleSubmit)}
//               className="space-y-8"
//               noValidate
//               aria-live="polite"
//             >
//               <DealDetailsForm
//                 control={dealForm.control}
//                 formDisabled={formDisabled}
//                 currencies={CURRENCIES}
//               />

//               {formDisabled && (
//                 <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-md">
//                   <p className="text-sm text-yellow-800 dark:text-yellow-200">
//                     გარიგების დეტალების შეცვლა შეუძლებელია, რადგან ნივთები უკვე
//                     დამატებულია.
//                   </p>
//                 </div>
//               )}

//               <Separator />

//               <section aria-label="ნივთები">
//                 <h2 className="text-2xl font-semibold mb-4">ნივთები</h2>

//                 <ItemForm
//                   form={itemForm}
//                   currencySymbol={currencySymbol}
//                   onAddItem={handleAddItem}
//                   categories={DEAL_CATEGORIES}
//                 />

//                 <ItemsList
//                   items={items}
//                   currencySymbol={currencySymbol}
//                   onRemoveItem={handleRemoveItem}
//                 />
//               </section>

//               {formDisabled && (
//                 <DealTotal
//                   items={items}
//                   dealData={dealForm.getValues()}
//                   totals={totals}
//                 />
//               )}

//               <Separator />

//               <section aria-label="გამყიდველის ინფორმაცია">
//                 <SellerInfoForm control={sellerInfoForm.control} />
//               </section>

//               <Button
//                 type="submit"
//                 className="w-full mt-6"
//                 disabled={items.length === 0 || submitting}
//                 aria-disabled={items.length === 0 || submitting}
//               >
//                 {submitting ? "იტვირთება..." : "შემდეგი"}
//               </Button>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default DealCreatePage;
