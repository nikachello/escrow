import React from "react";
import LandingSection from "../LandingSection";
import { InfiniteMovingCards } from "../../InfiniteMovingCards";

const testimonialsPeople = [
  {
    quote:
      "გარანტის საშუალებით ჩემი გაყიდვების რაოდენობა გაორმაგდა, მომხმარებლებთან ნდობის მოპოვება ძალიან გამარტივდა.",
    name: "ნინო გაზდელიანი",
    title: "ელ-კომერციის მენეჯერი",
  },
  {
    quote:
      "შემიძლია ჩემს დაკვეთაზე აუღელვებლად ვიმუშავო, ვიცი რომ მომხმარებელი მენდობა და გაუთვალისწინებელი გადაცილებისას არ იფიქრებს რომ ვატყუებ. მისი თანხა საიმედოდაა შენახული",
    name: "სალომე შარიქაძე",
    title: "დიზაინერი",
  },
  {
    quote:
      "ონლაინ ვაჭრობისას გამყიდველებს ყოველთვის გარანტის გამოყენებას ვთხოვ, რომელიც არ მთანხმდება ვიცი, რომ ხარისხის ან რაიმე სხვა პრობლემა ექნება",
    name: "ციკო ლაშქარავა",
    title: "დიასახლისი",
  },
  {
    quote:
      "საქართველოში ესქროუ სერვისის ნაკლებობა იყო, მიხარია რომ ეს სერვისი გამოჩნდა და შემიძლია ჩემს მომხმარებლებს ეს სერვისი ვურჩიო",
    name: "ჯაბა ლეშკაშელი",
  },
];

const testimonialsBrands = [
  {
    image: "/images/brands/borbalo.png",
  },
  {
    image: "/images/brands/cocacola.png",
  },
  { image: "/images/brands/metro.png" },
  { image: "/images/brands/veranda.png" },
  { image: "/images/brands/barambo.png" },
];

const PeopleAboutUs = () => {
  return (
    <LandingSection heading="რას ამბობენ ჩვენზე?">
      <InfiniteMovingCards
        items={testimonialsPeople}
        className="text-center"
        speed="fast"
      />
      <InfiniteMovingCards
        items={testimonialsBrands}
        className="text-center"
        speed="fast"
        direction="right"
      />
    </LandingSection>
  );
};

export default PeopleAboutUs;
