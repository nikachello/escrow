import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { SignupForm } from "../../forms/auth/SignUpForm";
import { useTranslations } from "next-intl";

const SignUpDialog = () => {
  const tAccount = useTranslations("Account");
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-300 to-yellow-200 text-primary rounded-full px-6 py-2 shadow-md hover:brightness-110 transition cursor-pointer"
          >
            {tAccount("register")}
          </Button>
        </DialogTrigger>
        <DialogContent className="overflow-y-auto max-h-screen mt-5 mb-5">
          <DialogTitle className="text-2xl font-bold">
            {tAccount("register")}
          </DialogTitle>
          <SignupForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignUpDialog;
