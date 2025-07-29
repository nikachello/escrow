import React from "react";
import { Control } from "react-hook-form";
import InputField from "@/components/primary/forms/InputField";
import { OtherPartyData } from "@/lib/types/create-deal";

interface OtherPartyFormProps {
  control: Control<OtherPartyData>;
}

const OtherPartyInfoForm: React.FC<OtherPartyFormProps> = ({ control }) => {
  return (
    <div className="space-y-4">
      <InputField
        control={control}
        name="email"
        label="მეორე მხარის ელ-ფოსტა"
        type="email"
      />
    </div>
  );
};

export default OtherPartyInfoForm;
