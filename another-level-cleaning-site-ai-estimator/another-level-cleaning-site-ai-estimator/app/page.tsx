import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TransparentPricing from "@/components/TransparentPricing";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import ServiceArea from "@/components/ServiceArea";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <TransparentPricing />

      {/* Clean you can feel section */}
      <section id="about" className="section">
        <div className="container grid md:grid-cols-2 gap-8 items-center">
          <div className="card flex flex-col">
            <h2 className="text-3xl font-bold text-hackerBlue mb-2">Clean you can feel.</h2>
            <p className="opacity-90">
              We're a local Jonesboro crew delivering spotless results across Northeast Arkansas.
              Fully insured, detail-obsessed, and customer-first. Try our AI estimator to get
              a fast, realistic price—then book with confidence.
            </p>
            <a href="/estimator" className="btn btn-primary mt-6 mx-auto w-max">Get AI Estimate</a>
          </div>
          <div className="card flex">
            <div className="flex flex-col relative leading-9 h-auto text-3xl font-bold text-hackerBlue mb-2">
              <p>What Makes us Better?</p>
            </div>
            <ul className="list-disc pl-6 space-y-2">
              <li>Soft wash & pressure wash experts</li>
              <li>Eco-friendly detergents & safe methods</li>
              <li>Flexible scheduling and reminders</li>
              <li>Transparent pricing with photo review</li>
            </ul>
          </div>
        </div>
      </section>

      <FAQ />
      <Testimonials />

      {/* New section */}
      <div className="flex flex-col relative min-h-[100px] p-5" style={{maxWidth: '1200px'}}>
        <section className="flex flex-col relative min-h-[100px] p-5 w-full self-stretch flex-grow max-w-[1200px] mx-auto" />
      </div>
      <ServiceArea />
      <Footer />
    </main>
  );
}
