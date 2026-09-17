import ClosingCtaSection from "../components/home/ClosingCtaSection";
import HeroSection from "../components/home/HeroSection";
import MeetErinSection from "../components/home/MeetErinSection";
import ReviewsSection from "../components/home/ReviewsSection";
import ServicesSection from "../components/home/ServicesSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <MeetErinSection />
      <ReviewsSection />
      <ClosingCtaSection />
    </>
  );
}
