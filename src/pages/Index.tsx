import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { JourneySection } from "@/components/JourneySection";
import { EventsSection } from "@/components/EventsSection";
import { GallerySection } from "@/components/GallerySection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { CTASection } from "@/components/CTASection";
import { AboutSection } from "@/components/AboutSection";
import { TeamSection } from "@/components/TeamSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        {/* <JourneySection /> */}
        {/* <EventsSection /> */}
        <GallerySection />
        <BenefitsSection />
        {/* <CTASection /> */}
        {/* <TeamSection /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
