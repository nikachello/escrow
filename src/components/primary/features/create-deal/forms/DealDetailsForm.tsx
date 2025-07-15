// components/DealDetailsForm.tsx
import React from "react";
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/aceternity/input";
import InputField from "@/components/primary/forms/InputField";
import SelectField from "@/components/primary/forms/SelectField";
import { Currency, DealFormData } from "@/lib/types/create-deal";
import TooltipCustom from "@/components/primary/ToolTipCustom";

interface DealDetailsFormProps {
  control: Control<DealFormData>;
  formDisabled: boolean;
  currencies: Currency[];
}

const DealDetailsForm: React.FC<DealDetailsFormProps> = ({
  control,
  formDisabled,
  currencies,
}) => {
  return (
    <div className="space-y-4">
      <InputField
        control={control}
        name="dealName"
        label="გარიგების სახელი"
        disabled={formDisabled}
        tooltip="შეიყვანეთ გარიგების სახელი, რომ თქვენს გარიგებებში მას მარტივად მიაგნოთ"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="inspectionDays"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="m-0">შემოწმების დღეები</FormLabel>
                <TooltipCustom
                  ButtonText="?"
                  content="შეიყვანეთ თუ რამდენი დღე შეგიძლიათ ნივთის შემოწმება"
                />
              </div>
              <FormControl>
                <Input {...field} disabled={formDisabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SelectField
          name="currency"
          control={control}
          options={currencies}
          placeholder="აირჩიეთ ვალუტა"
          label="ვალუტა"
          disabled={formDisabled}
        />

        <SelectField
          name="payer"
          control={control}
          options={[
            { id: "seller", name_ka: "გამყიდველი", name_en: "Buyer" },
            { id: "buyer", name_ka: "მყიდველი", name_en: "Seller" },
            { id: "equal", name_ka: "თანაბრად", name_en: "Half/half" },
          ]}
          placeholder="ვინ იხდის?"
          label="ვინ იხდის მომსახურების თანხას?"
          disabled={formDisabled}
        />

        <FormField
          control={control}
          name="shippingDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ტრანსპორტირების დღეები</FormLabel>
              <FormControl>
                <Input {...field} disabled={formDisabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default DealDetailsForm;
