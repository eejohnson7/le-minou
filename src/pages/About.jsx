import AboutClosingCta from "../components/about/AboutClosingCta";
import AboutHero from "../components/about/AboutHero";
import CarePrinciplesSection from "../components/about/CarePrinciplesSection";
import MeetErinAboutSection from "../components/about/MeetErinAboutSection";
import OriginSection from "../components/about/OriginSection";

export default function About() {
  return (
    <>
      <AboutHero />
      <OriginSection />
      <MeetErinAboutSection />
      <CarePrinciplesSection />
      <AboutClosingCta />
    </>
  );
}
