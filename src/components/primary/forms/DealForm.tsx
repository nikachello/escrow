"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dealSchema } from "@/lib/validations";

import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputField from "./InputField";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export const DealForm = () => {
  const router = useRouter();

  // ✅ Get session using BetterAuth hook
  const { data: session, isPending } = authClient.useSession();

  const form = useForm<z.infer<typeof dealSchema>>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      dealName: "",
      shippingDays: "",
    },
  });

  const onSubmit = (values: z.infer<typeof dealSchema>) => {
    if (!session?.user?.email) {
      toast.error("გთხოვთ, გაიარეთ ავტორიზაცია ან დარეგისტრირდით");
      return;
    }

    const params = new URLSearchParams({
      name: values.dealName,
      shippingDays: values.shippingDays.toString(),
    });

    router.push(`/app/create-deal?${params.toString()}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <InputField
          name="dealName"
          control={form.control}
          label="გარიგების სახელი"
        />

        <FormField
          control={form.control}
          name="shippingDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ტრანსპორტირების დღეები</FormLabel>
              <FormControl>
                <Input type="number" inputMode="numeric" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <span className="text-xs text-gray-400">
          ამ ღილაკზე დაჭერით თქვენ არ იხდით არაფერს
        </span>

        <Button
          className="w-full cursor-pointer rounded-full"
          type="submit"
          disabled={isPending}
        >
          გაგრძელება
        </Button>
      </form>
    </Form>
  );
};
