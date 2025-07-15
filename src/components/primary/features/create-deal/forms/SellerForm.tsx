import React from "react";
import { Control } from "react-hook-form";
import InputField from "@/components/primary/forms/InputField";
import { dealSellerData } from "@/lib/types/create-deal";

interface SellerInfoFormProps {
  control: Control<dealSellerData>;
}

const SellerInfoForm: React.FC<SellerInfoFormProps> = ({ control }) => {
  return (
    <div className="space-y-4">
      <InputField control={control} name="email" label="გამყიდველის ელ-ფოსტა" />
    </div>
  );
};

export default SellerInfoForm;
