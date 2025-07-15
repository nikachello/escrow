"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/aceternity/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/auth-client";
import { resetPasswordSchema } from "@/lib/types/auth";
import { useRouter } from "nextjs-toploader/app";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    if (!token) {
      toast.error("ბმული არასწორია ან ვადაგასულია");
      return;
    }

    setLoading(true);
    try {
      await authClient.resetPassword(
        {
          newPassword: values.password,
          token, // assuming BetterAuth expects this
        },
        {
          onSuccess: () => {
            toast.success("პაროლი წარმატებით განახლდა");
            router.replace("/");
          },
          onError: (ctx) => {
            toast.error(ctx?.error?.message || "დაფიქსირდა შეცდომა");
          },
        }
      );
    } catch {
      toast.error("ვერ მოხერხდა პაროლის აღდგენა");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="w-full max-w-md mx-auto mt-10 text-center">
        <Card>
          <CardHeader>
            <CardTitle>ბმული არასწორია</CardTitle>
            <CardDescription>
              პაროლის აღდგენის ბმული არ მოიძებნა ან ვადაგასულია.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>პაროლის აღდგენა</CardTitle>
          <CardDescription>
            შეიყვანეთ და დაადასტურეთ ახალი პაროლი
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ახალი პაროლი</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="************"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>დაადასტურეთ პაროლი</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="************"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "იტვირთება..." : "შენახვა"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
