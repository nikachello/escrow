import React from "react";

type Props = {
  children: React.ReactNode;
};

const ContentContainer = (props: Props) => {
  return (
    <div className="w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">{props.children}</div>
    </div>
  );
};

export default ContentContainer;
