import AboutSection from "../../components/aboutSection/AboutSection";
import BannerSection from "../../components/bannerSection/BannerSection";
import BenefitSection from "../../components/benefitSection/BenefitSection";
import Footer from "../../components/footer/Footer";
import Hero from "../../components/hero/Hero";
import Navbar from "../../components/navbar/Navbar";
import StartSection from "../../components/startSection/StartSection";

const Landing = () => {
  return (
    <div className="bg-secondary">
      <header className="flex flex-col h-dvh">
        <Navbar />
        <Hero />
      </header>
      <main>
        <StartSection />
        <BenefitSection />
        <AboutSection />
        <BannerSection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
