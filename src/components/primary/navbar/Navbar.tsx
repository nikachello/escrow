import React from "react";
import ContentContainer from "../containers/ContentContainer";
import Logo from "./Logo";
const Navbar = () => {
  return (
    <div className="bg-primary">
      <ContentContainer>
        <div className="flex justify-between items-center text-secondary">
          <Logo size="md" />
          <div>ad</div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default Navbar;
