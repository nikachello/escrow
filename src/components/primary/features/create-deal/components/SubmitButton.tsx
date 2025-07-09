import React from "react";
import { Button } from "@/components/ui/button";
import { FORM_MESSAGES } from "@/lib/constants/form-messages";

interface SubmitButtonProps {
  disabled: boolean;
  isSubmitting: boolean;
  hasItems: boolean;
  className?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  disabled,
  isSubmitting,
  hasItems,
  className = "",
}) => {
  const isDisabled = disabled || !hasItems || isSubmitting;

  const getButtonText = () => {
    if (isSubmitting) return FORM_MESSAGES.SUBMITTING;
    if (!hasItems) return FORM_MESSAGES.NEXT;
    return FORM_MESSAGES.NEXT;
  };

  return (
    <Button
      type="submit"
      className={`w-full mt-6 ${className}`}
      disabled={isDisabled}
      aria-disabled={isDisabled}
    >
      {getButtonText()}
    </Button>
  );
};

export default SubmitButton;
