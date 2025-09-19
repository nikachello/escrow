import React from "react";
import LandingSection from "../LandingSection";
import Image from "next/image";
import { ShieldCheck, Store, Star } from "lucide-react";
import { useTranslations } from "next-intl";

const OfferForSellers = () => {
  const t = useTranslations("Landing");
  return (
    <div>
      <LandingSection headingColor="" heading={t("offerToSellers")}>
        <div className="flex items-center md:flex-row justify-between py-10">
          <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
            <p className="text-2xl mb-5 -mt-10">{t("joinUs")}</p>

            <div className="flex items-center gap-3 text-lg">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              {t("safeTransactions")}
            </div>

            <div className="flex items-center gap-3 text-lg">
              <Store className="w-5 h-5" aria-hidden="true" />
              {t("shopAccount")}
            </div>

            <div className="flex items-center gap-3 text-lg">
              <Star className="w-5 h-5 -mt-1" aria-hidden="true" />
              {t("ratingSystem")}
            </div>
          </div>

          <div className="hidden md:block ml-10">
            <Image
              alt="შეთავაზება გამყიდველებს"
              src="/images/sellers-offer.jpg"
              width={500}
              height={500}
              className="rounded-md"
            />
          </div>
        </div>
      </LandingSection>
    </div>
  );
};

export default OfferForSellers;
