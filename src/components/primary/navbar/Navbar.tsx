import React from "react";
import ContentContainer from "../containers/ContentContainer";
import Logo from "./Logo";
import { CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
const Navbar = () => {
  return (
    <div className="bg-primary w-full shadow-sm">
      <ContentContainer>
        <div className="flex justify-between items-center text-secondary py-4">
          <Logo size="md" />

          <div className="flex items-center gap-4">
            <CircleUser className="w-6 h-6 cursor-pointer" />
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-300 to-yellow-200 text-primary rounded-full px-6 py-2 shadow-md hover:brightness-110 transition cursor-pointer"
            >
              რეგისტრაცია
            </Button>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default Navbar;
