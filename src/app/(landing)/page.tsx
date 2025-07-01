import RoundedContainer from "@/components/primary/containers/RoundedContainer";
import HowItWorks from "@/components/primary/landing/how-it-works/HowItWorks";
import AboutLanding from "@/components/primary/landing/landing-convert/AboutLanding";
import PeopleAboutUs from "@/components/primary/landing/people-about-us/PeopleAboutUs";
import Navbar from "@/components/primary/navbar/Navbar";

export default function Home() {
  return (
    <div className="w-full">
      <Navbar />
      <AboutLanding />
      <RoundedContainer>
        <HowItWorks />
        <PeopleAboutUs />
      </RoundedContainer>
    </div>
  );
}
