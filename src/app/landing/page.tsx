import { Navbar } from './components/navbar';
import { Footer } from './components/footer';
import { HeroSection } from './sections/hero';
import { FeaturesSection } from './sections/features';
import { TestimonialsSection } from './sections/testimonials';
import { PricingSection } from './sections/pricing';
import { ContactSection } from './sections/contact';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
