import Image from "next/image";
import React from "react";
import LandingSection from "../LandingSection";
import { useTranslations } from "next-intl";

const HowItWorks = () => {
  const t = useTranslations("Landing");
  return (
    <LandingSection heading={t("howItWorks")}>
      <Image
        src="/images/escrow.jpg"
        alt="ესქროუ ფოტო"
        width={500}
        height={200}
        className="w-full"
      />
    </LandingSection>
  );
};

export default HowItWorks;
