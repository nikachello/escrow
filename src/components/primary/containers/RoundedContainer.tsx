import React, { ReactNode } from "react";
import ContentContainer from "./ContentContainer";

type Props = { children: ReactNode };

const RoundedContainer = ({ children }: Props) => {
  return (
    <div className="relative -mt-5 rounded-t-3xl bg-white">
      <ContentContainer>{children}</ContentContainer>
    </div>
  );
};

export default RoundedContainer;
