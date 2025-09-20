"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Form } from "@/components/ui/form";

import DealDetailsForm from "@/components/primary/features/create-deal/forms/DealDetailsForm";
import ItemForm from "@/components/primary/features/create-deal/forms/ItemForm";
import DealTotal from "@/components/primary/features/create-deal/components/DealTotal";
import LoadSpinner from "../../loadSpinner";
import { useDealCreate } from "./hooks/useDealCreate";
import { CURRENCIES } from "@/lib/constants/create-deal";
import FormDisabledNotice from "../../forms/formDisabledNotice";
import FormSection from "./components/FormSection";
import { DEAL_CATEGORIES } from "@/lib/constants";
import SubmitButton from "./components/SubmitButton";
import ItemsList from "./components/ItemList";
import OtherPartyInfoForm from "./forms/OtherPartyForm";
import { useTranslations } from "next-intl";

const DealCreatePage: React.FC = () => {
  const tValidation = useTranslations("Validations");
  const { state, forms, data, handlers } = useDealCreate();
  const searchParams = useSearchParams();

  // Prefill inputs from URL
  useEffect(() => {
    const name = searchParams.get("name");
    const shippingDays = searchParams.get("shippingDays");

    if (name) {
      forms.dealForm.setValue("dealName", name);
    }

    if (shippingDays) {
      const parsed = parseFloat(shippingDays);
      if (!isNaN(parsed)) {
        forms.dealForm.setValue("shippingDays", parsed.toString());
      }
    }
  }, [searchParams, forms.dealForm, forms.itemForm]);

  if (state.loadingSession) {
    return <LoadSpinner message={tValidation("loading")} />;
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">
            {tValidation("create_deal_title")}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {tValidation("create_deal_description")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...forms.dealForm}>
            <form
              onSubmit={forms.dealForm.handleSubmit(handlers.handleSubmit)}
              className="space-y-8"
              noValidate
              aria-live="polite"
            >
              <DealDetailsForm
                control={forms.dealForm.control}
                formDisabled={state.formDisabled}
                currencies={CURRENCIES}
              />

              {state.formDisabled && (
                <FormDisabledNotice
                  message={tValidation("form_disabled_notice")}
                />
              )}

              <Separator />

              <FormSection
                title={tValidation("items_section_title")}
                ariaLabel="ნივთები"
              >
                <ItemForm
                  form={forms.itemForm}
                  currencySymbol={data.currencySymbol}
                  onAddItem={handlers.handleAddItem}
                  categories={DEAL_CATEGORIES}
                />

                <ItemsList
                  items={data.items}
                  currencySymbol={data.currencySymbol}
                  onRemoveItem={handlers.handleRemoveItem}
                />
              </FormSection>

              {state.formDisabled && (
                <DealTotal
                  items={data.items}
                  dealData={forms.dealForm.getValues()}
                  totals={data.totals}
                />
              )}

              <Separator />

              <FormSection
                title={tValidation("seller_info_section_title")}
                ariaLabel="მეორე მხარის ინფორმაცია"
              >
                <OtherPartyInfoForm
                  control={forms.otherPartyInfoForm.control}
                />
              </FormSection>

              <SubmitButton
                disabled={state.submitting}
                isSubmitting={state.submitting}
                hasItems={state.hasItems}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealCreatePage;
