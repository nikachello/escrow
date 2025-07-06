import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { CircleUser } from "lucide-react";
import { SigninForm } from "../../forms/auth/SignInForm";

const SignInDialog = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <CircleUser className="w-6 h-6 cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="overflow-y-auto max-h-screen mt-5 mb-5">
          <DialogTitle className="text-2xl font-bold">შესვლა</DialogTitle>
          <SigninForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignInDialog;
