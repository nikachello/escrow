import React from "react";
import ContentContainer from "../../containers/ContentContainer";
import CreateDealLanding from "./CreateDealLanding";
import { useTranslations } from "next-intl";

const AboutLanding = () => {
  const t = useTranslations("Landing");
  return (
    <div className="w-full tracking-wide bg-primary py-16">
      <ContentContainer>
        <div className="flex tracking-wide flex-col max-w-4xl lg:max-w-7xl mx-auto md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left mx-auto w-full md:w-1/2 lg:w-full">
            <div className="max-w-[600px]">
              <h1 className=" font-heading text-secondary text-4xl md:text-6xl font-bold leading-relaxed tracking-wide">
                {t("title1")}
                <br /> {t("title2")}
              </h1>
              <p className="text-4xl md:text-6xl font-bold tracking-wide font-heading mt-4 bg-gradient-to-r from-orange-300 to-yellow-200 leading-tight bg-clip-text text-transparent">
                {t("title3")} <br /> {t("title4")}
              </p>
            </div>
          </div>
          <CreateDealLanding />
        </div>
      </ContentContainer>
    </div>
  );
};

export default AboutLanding;
