import React, { ReactNode } from "react";
import ContentContainer from "./ContentContainer";
import { cn } from "@/lib/utils";

type Props = { bg?: string; children: ReactNode; bottom?: boolean };

const RoundedContainer = ({ bg = "bg-white", children, bottom }: Props) => {
  return (
    <div
      className={cn(
        "relative -mt-5 rounded-t-3xl z-10",
        bottom && "rounded-b-3xl z-10",
        bg
      )}
    >
      <ContentContainer>{children}</ContentContainer>
    </div>
  );
};

export default RoundedContainer;
