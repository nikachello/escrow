"use client";

import React from "react";
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

  const handleLogOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <div className="bg-primary w-full shadow-sm">
      <ContentContainer>
        <div className="flex justify-between items-center text-secondary py-4">
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
                      <Button variant="secondary">
                        გამარჯობა, {session.user.firstName} <MenuIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-60" align="center">
                      <DropdownMenuGroup>
                        <DropdownMenuItem>პარამეტრები</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogOut}>
                          გასვლა
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
