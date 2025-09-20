"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import { SignInSchema } from "@/lib/types/auth";
import { useTranslations } from "next-intl";

type FormData = z.infer<typeof SignInSchema>;

export function SigninForm() {
  const tMessages = useTranslations("Messages");
  const tAccount = useTranslations("Account");
  const tGeneral = useTranslations("General");

  const [view, setView] = useState<"signin" | "reset">("signin");
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    setLoading(true);
    try {
      const { error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });
      if (error?.status === 401) {
        toast.error(tMessages("check_data"), {});
      } else {
        setLoading(false);
        window.location.reload();
      }
    } catch (error) {
      console.error(tMessages("cant_login"), error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetRequest = async () => {
    setLoading(true);
    try {
      const values = form.getValues();
      await authClient.forgetPassword({
        email: values.email,
        redirectTo: "/reset-password",
      });
      toast.info(tMessages("reset_password_email"));
      setView("signin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-none bg-white md:rounded-2xl md:p-8 dark:bg-black">
      <Form {...form}>
        <form
          onSubmit={
            view === "signin"
              ? form.handleSubmit(onSubmit)
              : (e) => e.preventDefault()
          }
          className="space-y-4"
        >
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tAccount("email")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="name@email.com"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field (Only in Signin View) */}
          {view === "signin" && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tAccount("password")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Actions */}
          {view === "signin" ? (
            <>
              <button
                type="submit"
                disabled={loading}
                className={`group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] ${
                  loading ? "cursor-not-allowed opacity-70" : ""
                }`}
              >
                {loading ? tGeneral("loading") : `${tAccount("login")} →`}
                <BottomGradient />
              </button>

              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setView("reset");
                }}
                className="w-full"
                variant="outline"
              >
                {tAccount("forget_password")}
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                disabled={loading}
                onClick={handleResetRequest}
                className="w-full"
              >
                {loading ? tGeneral("loading") : tAccount("forget_password")}
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setView("signin");
                }}
                className="w-full"
                variant="outline"
              >
                {tAccount("return_to_login")}
              </Button>
            </>
          )}

          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        </form>
      </Form>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);
