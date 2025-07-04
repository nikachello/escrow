import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { SignupForm } from "../forms/auth/SignUpForm";

type Props = {};

const SignUpDialog = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          size="lg"
          className="bg-gradient-to-r from-orange-300 to-yellow-200 text-primary rounded-full px-6 py-2 shadow-md hover:brightness-110 transition cursor-pointer"
        >
          რეგისტრაცია
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-2xl font-bold">დარეგისტრირდით</DialogTitle>
        <SignupForm />
      </DialogContent>
    </Dialog>
  );
};

export default SignUpDialog;
