import React, { ReactNode } from "react";

type Props = { heading: string; children: ReactNode };

const LandingSection = (props: Props) => {
  return (
    <div className="items-center text-center p-10 font-heading font-bold flex flex-col gap-10">
      <h1 className="text-2xl">{props.heading}</h1>
      <div>{props.children}</div>
    </div>
  );
};

export default LandingSection;
