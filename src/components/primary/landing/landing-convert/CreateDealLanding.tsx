import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DealForm } from "../../forms/DealForm";
import { useTranslations } from "next-intl";

const CreateDealLanding = () => {
  const tDeal = useTranslations("Deal");

  return (
    <Card className="w-3/4 md:w-full lg:w-full text-center tracking-wide">
      <CardHeader className="font-heading">
        <CardTitle className="text-2xl tracking-wide">
          {tDeal("create_deal")}
        </CardTitle>
        <CardDescription>{tDeal("start_safe_deal")}</CardDescription>
      </CardHeader>
      <CardContent>
        <DealForm />
      </CardContent>
    </Card>
  );
};

export default CreateDealLanding;
