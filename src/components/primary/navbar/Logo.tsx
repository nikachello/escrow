"use client";

import Link from "next/link";
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
  return (
    <Link
      href="/"
      className={`cursor-pointer font-bold font-heading text-secondary ${sizeMap[size]}`}
    >
      Garanti.ge
    </Link>
  );
};

export default Logo;
