"use client"; // ← Add this at the top

import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
};

const Logo = ({ size = "sm" }: Props) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className={`cursor-pointer font-bold font-heading text-secondary ${sizeMap[size]}`}
    >
      Garanti.ge
    </div>
  );
};

export default Logo;
