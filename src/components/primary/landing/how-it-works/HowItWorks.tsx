import Image from "next/image";
import React from "react";
import LandingSection from "../LandingSection";

const HowItWorks = () => {
  return (
    <LandingSection heading="როგორ მუშაობს შუამავალი?">
      <Image
        src="/images/escrow.jpg"
        alt="ესქროუ ფოტო"
        width={650}
        height={200}
      />
    </LandingSection>
  );
};

export default HowItWorks;
