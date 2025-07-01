import React, { ReactNode } from "react";

type Props = { heading: string; children: ReactNode };

const LandingSection = (props: Props) => {
  return (
    <div className="items-center text-center font-heading font-bold flex flex-col gap-15 md:text-left md:max-w-7xl md:m-auto md:items-stretch pt-30">
      <h1 className="text-4xl">{props.heading}</h1>
      <div>{props.children}</div>
    </div>
  );
};

export default LandingSection;
