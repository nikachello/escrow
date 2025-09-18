"use client";

import React from "react";
import ContentContainer from "../containers/ContentContainer";
import Logo from "./Logo";
import { MenuIcon } from "lucide-react";
import SignUpDialog from "../dialogs/auth/SignUpDialog";
import SignInDialog from "../dialogs/auth/SignInDialog";
import { useSession } from "@/context/SessionContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import Link from "next/link";

const Navbar = () => {
  const { session } = useSession();

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
              <div className="flex flex-row items-center gap-5">
                <Link href="/app/create-deal">
                  <Button variant="secondary">გარიგების შექმნა</Button>
                </Link>

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
                      <Link href="/app/my-deals">
                        <DropdownMenuItem asChild>
                          <button className="w-full text-left">
                            <span className="inline">ჩემი გარიგებები</span>
                          </button>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem>
                        <span className="inline">პარამეტრები</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogOut}>
                        <span className="inline">გასვლა</span>
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
