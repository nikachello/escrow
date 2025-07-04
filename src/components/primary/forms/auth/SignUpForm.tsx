"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/aceternity/input";
import { authClient } from "@/lib/auth-client";

type FormData = z.infer<typeof signUpSchema>;

export function SignupForm() {
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      nationalId: "",
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    const { nationalId, firstName, lastName, email, password, phone } = values;
    try {
      await authClient.signUp.email({
        nationalId,
        firstName,
        lastName,
        email,
        phone: `+995${phone}`,
        password,
        name: `${firstName} ${lastName}`,
        callbackURL: "/auth/verify-result",
      });
      setEmailSent(true);
    } catch (error) {
      console.error("რეგისტრაცია ვერ მოხერხდა", error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-none bg-white md:rounded-2xl md:p-8 dark:bg-black">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name & Last Name */}
          <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>სახელი</FormLabel>
                  <FormControl>
                    <Input placeholder="გიორგი" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>გვარი</FormLabel>
                  <FormControl>
                    <Input placeholder="გიორგაშვილი" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* National ID */}
          <FormField
            control={form.control}
            name="nationalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>პირადი ნომერი</FormLabel>
                <FormControl>
                  <Input placeholder="01001010101" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ელ-ფოსტა</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="name@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ტელეფონი</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-neutral-500 select-none">
                      +995
                    </span>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="5XXXXXXXX"
                      maxLength={9}
                      className="pl-14"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>პაროლი</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Repeat Password */}
          <FormField
            control={form.control}
            name="repeatPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>გაიმეორეთ პაროლი</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          >
            რეგისტრაცია &rarr;
            <BottomGradient />
          </button>

          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        </form>
      </Form>

      {emailSent && (
        <div className="text-green-600 text-center mt-4">
          ✅ თქვენი რეგისტრაცია წარმატებით დასრულდა. გთხოვთ, გადაამოწმოთ
          ელ-ფოსტა!
        </div>
      )}
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);
