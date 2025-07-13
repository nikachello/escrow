"use client";

import React, { useEffect, useState } from "react";
import ContentContainer from "../containers/ContentContainer";
import Logo from "./Logo";
import { MenuIcon } from "lucide-react";
import SignUpDialog from "../dialogs/auth/SignUpDialog";
import SignInDialog from "../dialogs/auth/SignInDialog";
import { SessionType } from "@/lib/types/session";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

type Props = {
  session: SessionType | null;
};

const Navbar = ({ session }: Props) => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  // ✅ Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <div
      className={`w-full z-50 fixed top-0 transition-all duration-300${
        scrolled
          ? "bg-primary shadow-md backdrop-blur-md py-4"
          : "bg-transparent py-4"
      }`}
    >
      <ContentContainer>
        <div className="flex justify-between items-center text-secondary transition-all duration-300">
          <Logo size="md" />

          <div className="flex items-center gap-4">
            {session?.user ? (
              <div className="w-full">
                <div className="flex flex-row items-center justify-between gap-5">
                  <Button
                    onClick={() => {
                      router.push("/app/create-deal");
                    }}
                    variant="secondary"
                    className="cursor-pointer"
                  >
                    გარიგების შექმნა
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        className="flex items-center gap-2"
                      >
                        <span className="hidden md:inline">
                          გამარჯობა, {session.user.firstName}
                        </span>
                        <MenuIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-60" align="center">
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <span>პარამეტრები</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogOut}>
                          <span>გასვლა</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ) : (
              <>
                <SignInDialog />
                <SignUpDialog />
              </>
            )}
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default Navbar;
