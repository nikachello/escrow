import Image from "next/image";
import React from "react";

const HowItWorks = () => {
  return (
    <div className="items-center text-center p-10 font-heading font-bold flex flex-col gap-10">
      <h1 className="text-2xl">როგორ მუშაობს შუამავალი?</h1>
      <Image
        src="/images/escrow.jpg"
        alt="ესქროუ ფოტო"
        width={650}
        height={200}
      />
    </div>
  );
};

export default HowItWorks;
