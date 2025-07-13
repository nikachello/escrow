"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  agreeToDeal,
  cancelDeal,
  completeDeal,
  confirmDelivery,
  disputeDeal,
  payForDeal,
  shipDeal,
} from "@/lib/actions/deal";
import { DealAction } from "@/lib/types/deal";

const actionHandlers = {
  agree: agreeToDeal,
  cancel: cancelDeal,
  pay: payForDeal,
  ship: shipDeal,
  confirm_delivery: confirmDelivery,
  complete: completeDeal,
  dispute: disputeDeal,
};

type ActionButtonProps = {
  action: {
    action: DealAction;
    label: string;
    variant: "default" | "destructive" | "outline" | "secondary";
  };
  dealId: string;
};

function SubmitButton({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "default" | "destructive" | "outline" | "secondary";
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant={variant} disabled={pending}>
      {pending ? "დაელოდეთ..." : children}
    </Button>
  );
}

export function ActionButton({ action, dealId }: ActionButtonProps) {
  const [state, formAction] = useFormState(actionHandlers[action.action], null);

  return (
    <form action={formAction}>
      <input type="hidden" name="dealId" value={dealId} />
      <SubmitButton variant={action.variant}>{action.label}</SubmitButton>
      {state?.error && (
        <p className="text-red-500 text-sm mt-1">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-green-500 text-sm mt-1">{state.success}</p>
      )}
    </form>
  );
}
