import React from "react";
import ContentContainer from "../containers/ContentContainer";
import Logo from "./Logo";
import { CircleUser } from "lucide-react";
import SignUpDialog from "../dialogs/SignUpDialog";
const Navbar = () => {
  return (
    <div className="bg-primary w-full shadow-sm">
      <ContentContainer>
        <div className="flex justify-between items-center text-secondary py-4">
          <Logo size="md" />

          <div className="flex items-center gap-4">
            <CircleUser className="w-6 h-6 cursor-pointer" />
            <SignUpDialog />
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default Navbar;
