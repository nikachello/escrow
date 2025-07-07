"use client";

import React from "react";
import ContentContainer from "../containers/ContentContainer";
import Logo from "./Logo";
import { CircleUser } from "lucide-react";
import SignUpDialog from "../dialogs/auth/SignUpDialog";
import SignInDialog from "../dialogs/auth/SignInDialog";
import { SessionType } from "@/types/session";
import Link from "next/link";
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
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full" asChild>
                    <Button variant="secondary">
                      გამარჯობა, {session.user.firstName}
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
