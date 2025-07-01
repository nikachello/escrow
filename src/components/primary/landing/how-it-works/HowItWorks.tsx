import Image from "next/image";
import React from "react";
import LandingSection from "../LandingSection";

const HowItWorks = () => {
  return (
    <LandingSection heading="როგორ მუშაობს შუამავალი?">
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
