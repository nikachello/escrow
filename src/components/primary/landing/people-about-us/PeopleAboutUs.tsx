"use client";

import React from "react";
import LandingSection from "../LandingSection";
import { InfiniteMovingCards } from "../../InfiniteMovingCards";
import { useTranslations } from "next-intl";

const testimonialsBrands = [
  { image: "/images/brands/borbalo.png" },
  { image: "/images/brands/cocacola.png" },
  { image: "/images/brands/metro.png" },
  { image: "/images/brands/veranda.png" },
  { image: "/images/brands/barambo.png" },
];

const PeopleAboutUs = () => {
  const t = useTranslations("Landing");

  // Map testimonial keys to array
  const testimonialKeys = ["0", "1", "2", "3"];
  const testimonialsPeople = testimonialKeys.map((key) => ({
    quote: t(`testimonials.${key}.quote`),
    name: t(`testimonials.${key}.name`),
    title: t(`testimonials.${key}.title`),
  }));

  return (
    <div className="overflow-x-hidden pb-15">
      <LandingSection heading={t("testimonialsHeading")}>
        <InfiniteMovingCards
          items={testimonialsPeople}
          className="text-center"
          speed="slow"
        />
        <InfiniteMovingCards
          items={testimonialsBrands}
          className="text-center"
          speed="slow"
          direction="right"
        />
      </LandingSection>
    </div>
  );
};

export default PeopleAboutUs;
