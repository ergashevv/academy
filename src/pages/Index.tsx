import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <div id="about">
        <About />
      </div>
      <div id="programs">
        <Programs />
      </div>
      <div id="why-choose-us">
        <WhyChooseUs />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="gallery">
        <Gallery />
      </div>
      <div id="cta">
        <FinalCTA />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
