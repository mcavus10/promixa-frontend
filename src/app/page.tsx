import { Navbar } from './landing/components/navbar';
import { Footer } from './landing/components/footer';
import { HeroSection } from './landing/sections/hero';
import { FeaturesSection } from './landing/sections/features';
import { PricingSection } from './landing/sections/pricing';
import { ContactSection } from './landing/sections/contact';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
