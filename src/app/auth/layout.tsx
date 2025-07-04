import React from "react";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <div className="max-h-[100px] w-screen position absolute">{children}</div>
  );
};

export default Layout;
