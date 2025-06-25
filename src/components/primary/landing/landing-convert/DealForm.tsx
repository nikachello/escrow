"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { dealSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { DEAL_CATEGORIES, USER_ROLES } from "@/lib/constants";
import SelectField from "../../form/SelectField";
import { Input } from "@/components/ui/input";

export const DealForm = () => {
  const form = useForm<z.infer<typeof dealSchema>>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      userRole: "",
      dealCategory: "",
    },
  });

  const onSubmit = (values: z.infer<typeof dealSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <SelectField
          name="dealCategory"
          control={form.control}
          label="გარიგების ტიპი"
          options={DEAL_CATEGORIES}
          placeholder="აირჩიეთ კატეგორია"
        />

        <SelectField
          control={form.control}
          label="ყიდით თუ ყიდულობთ?"
          name="userRole"
          options={USER_ROLES}
          placeholder="აირჩიეთ ტიპი"
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>გარიგების თანხა</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="₾500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <span className="text-xs text-gray-400">
          ამ ღილაკზე დაჭერით თქვენ არ იხდით არაფერს
        </span>
        <Button className="w-full cursor-pointer rounded-full" type="submit">
          გაგრძელება
        </Button>
      </form>
    </Form>
  );
};
