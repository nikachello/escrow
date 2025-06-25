import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DealForm } from "./DealForm";

const CreateDealLanding = () => {
  return (
    <Card className="w-3/4 md:w-full lg:w-full text-center tracking-wide">
      <CardHeader className="font-heading">
        <CardTitle className="text-2xl tracking-wide">
          შექმენი გარიგება
        </CardTitle>
        <CardDescription>
          დაიწყე უსაფრთხო გარიგება შუამავლის დახმარებით
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DealForm />
      </CardContent>
    </Card>
  );
};

export default CreateDealLanding;
