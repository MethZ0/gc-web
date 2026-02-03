import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhoWeAre } from "@/components/WhoWeAre";
import { TeamSection

 } from "@/components/TeamSection";
export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="min-h-screen">
        <WhoWeAre />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}