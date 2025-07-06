"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/primary/navbar/Navbar";
import RoundedContainer from "@/components/primary/containers/RoundedContainer";
import Footer from "@/components/primary/footer/Footer";
import AboutLanding from "@/components/primary/landing/landing-convert/AboutLanding";
import HowItWorks from "@/components/primary/landing/how-it-works/HowItWorks";
import PeopleAboutUs from "@/components/primary/landing/people-about-us/PeopleAboutUs";
import OfferForSellers from "@/components/primary/landing/offer-for-sellers/OfferForSellers";
import Faq from "@/components/primary/landing/faq/Faq";

export default function Home() {
  return (
    <Suspense fallback={<div>Loadings...</div>}>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    const param = searchParams.get("email-verified");
    if (param === "success") {
      setIsEmailVerified(true);

      // Remove the query param from the URL without reload
      window.history.replaceState(null, "", window.location.pathname);

      // Hide the message after 5 seconds
      const timer = setTimeout(() => {
        setIsEmailVerified(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return (
    <div className="w-full tracking-wider">
      {isEmailVerified && (
        <div className="text-green-600 text-center py-4">
          ✅ ელ-ფოსტა წარმატებით დადასტურდა!
        </div>
      )}

      {/* <Navbar /> */}
      <AboutLanding />
      <RoundedContainer>
        <HowItWorks />
        <PeopleAboutUs />
      </RoundedContainer>
      <RoundedContainer bg="bg-[#D2E7F5]">
        <OfferForSellers />
      </RoundedContainer>
      <RoundedContainer bottom={true}>
        <Faq />
      </RoundedContainer>
      <div className="bg-primary relative z-0 -mt-5 pt-10">
        <Footer />
      </div>
    </div>
  );
}
