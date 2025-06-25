import ContentContainer from "@/components/primary/containers/ContentContainer";
import AboutLanding from "@/components/primary/landing/AboutLanding";
import Navbar from "@/components/primary/navbar/Navbar";

export default function Home() {
  return (
    <div className="w-full">
      <Navbar />
      <AboutLanding />
    </div>
  );
}
