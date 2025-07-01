import React from "react";
import ContentContainer from "../containers/ContentContainer";
import Link from "next/link";

const Footer = () => {
  return (
    <ContentContainer>
      <div className="m-auto font-heading py-10 max-w-7xl text-white">
        <div className="flex justify-between items-center">
          <Link className="font-bold  text-3xl" href="/">
            Garanti.ge
          </Link>
          <span>2025 Garanti LLC</span>
        </div>
      </div>
    </ContentContainer>
  );
};

export default Footer;
