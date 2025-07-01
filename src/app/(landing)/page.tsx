import RoundedContainer from "@/components/primary/containers/RoundedContainer";
import Footer from "@/components/primary/footer/Footer";
import Faq from "@/components/primary/landing/faq/Faq";
import HowItWorks from "@/components/primary/landing/how-it-works/HowItWorks";
import AboutLanding from "@/components/primary/landing/landing-convert/AboutLanding";
import OfferForSellers from "@/components/primary/landing/offer-for-sellers/OfferForSellers";
import PeopleAboutUs from "@/components/primary/landing/people-about-us/PeopleAboutUs";
import Navbar from "@/components/primary/navbar/Navbar";

export default function Home() {
  return (
    <div className="w-full tracking-wider">
      <Navbar />
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
