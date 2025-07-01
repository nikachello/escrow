import React, { ReactNode } from "react";
import ContentContainer from "./ContentContainer";
import { cn } from "@/lib/utils";

type Props = { bg?: String; children: ReactNode };

const RoundedContainer = ({ bg = "bg-white", children }: Props) => {
  return (
    <div className={cn("relative -mt-5 rounded-t-3xl", bg)}>
      <ContentContainer>{children}</ContentContainer>
    </div>
  );
};

export default RoundedContainer;
