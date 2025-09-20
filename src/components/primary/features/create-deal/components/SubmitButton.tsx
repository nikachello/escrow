import React from "react";
import { Button } from "@/components/ui/button";

import { useTranslations } from "next-intl";

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
    const tValidations = useTranslations("Validations");
    if (isSubmitting) return tValidations("submitting");
    if (!hasItems) return tValidations("next");
    return tValidations("next");
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
