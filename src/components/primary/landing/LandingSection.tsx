import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = { headingColor?: string; heading: string; children: ReactNode };

const LandingSection = ({ headingColor = "", heading, children }: Props) => {
  return (
    <div
      className={cn(
        "items-center text-center font-heading font-bold flex flex-col gap-15 md:text-left md:max-w-7xl md:m-auto md:items-stretch pt-30",
        headingColor
      )}
    >
      <h1 className="text-4xl">{heading}</h1>
      <div>{children}</div>
    </div>
  );
};

export default LandingSection;
