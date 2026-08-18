import BrandStatement from "../components/home/BrandStatement";
import ClosingCtaSection from "../components/home/ClosingCtaSection";
import HeroSection from "../components/home/HeroSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import MeetErinSection from "../components/home/MeetErinSection";
import ServiceAreaFaqSection from "../components/home/ServiceAreaFaqSection";
import ServicesSection from "../components/home/ServicesSection";
import WhySection from "../components/home/WhySection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandStatement />
      <ServicesSection />
      <WhySection />
      <MeetErinSection />
      <HowItWorksSection />
      <ServiceAreaFaqSection />
      <ClosingCtaSection />
    </>
  );
}
