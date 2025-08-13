import HeroSection from "@/components/HeroSection";
import AcceptedFormatsSection from "@/components/AcceptedFormatsSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <AcceptedFormatsSection />
      <AboutSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Home;
