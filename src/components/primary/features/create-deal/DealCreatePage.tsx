"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Form } from "@/components/ui/form";

// Feature components
import DealDetailsForm from "@/components/primary/features/create-deal/forms/DealDetailsForm";
import ItemForm from "@/components/primary/features/create-deal/forms/ItemForm";
import DealTotal from "@/components/primary/features/create-deal/components/DealTotal";
import LoadSpinner from "../../loadSpinner";
import { FORM_MESSAGES } from "@/lib/constants/form-messages";
import { useDealCreate } from "./hooks/useDealCreate";
import { CURRENCIES } from "@/lib/constants/create-deal";
import FormDisabledNotice from "../../forms/formDisabledNotice";
import FormSection from "./components/FormSection";
import { DEAL_CATEGORIES } from "@/lib/constants";
import SubmitButton from "./components/SubmitButton";
import ItemsList from "./components/ItemList";
import SellerInfoForm from "./forms/OtherPartyForm";

// UI components

const DealCreatePage: React.FC = () => {
  const { state, forms, data, handlers } = useDealCreate();

  // Loading state
  if (state.loadingSession) {
    return <LoadSpinner message={FORM_MESSAGES.LOADING} />;
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">
            {FORM_MESSAGES.CREATE_DEAL_TITLE}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {FORM_MESSAGES.CREATE_DEAL_DESCRIPTION}
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
              {/* Deal Details Section */}
              <DealDetailsForm
                control={forms.dealForm.control}
                formDisabled={state.formDisabled}
                currencies={CURRENCIES}
              />

              {/* Form Disabled Notice */}
              {state.formDisabled && (
                <FormDisabledNotice
                  message={FORM_MESSAGES.FORM_DISABLED_NOTICE}
                />
              )}

              <Separator />

              {/* Items Section */}
              <FormSection
                title={FORM_MESSAGES.ITEMS_SECTION_TITLE}
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

              {/* Deal Total Section */}
              {state.formDisabled && (
                <DealTotal
                  items={data.items}
                  dealData={forms.dealForm.getValues()}
                  totals={data.totals}
                />
              )}

              <Separator />

              {/* Seller Info Section */}
              <FormSection
                title={FORM_MESSAGES.SELLER_INFO_SECTION_TITLE}
                ariaLabel="გამყიდველის ინფორმაცია"
              >
                <SellerInfoForm control={forms.otherPartyInfoForm.control} />
              </FormSection>

              {/* Submit Button */}
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
