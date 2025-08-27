"use client";
import { useState } from "react";

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqs = [
    {
      question: "How accurate is the AI estimate feature?",
      answer: "Our AI estimation tool has 95% accuracy for window counting and provides estimates within 10% of final pricing. Final pricing may vary based on accessibility and specific requirements."
    },
    {
      question: "What areas do you serve in Northeast Arkansas?",
      answer: "We serve Jonesboro, Paragould, Blytheville, Newport, and surrounding areas within a 50-mile radius of our Jonesboro office."
    },
    {
      question: "Do you provide free estimates?",
      answer: "Yes! We offer free estimates through our AI tool for uploaded photos, and free on-site estimates for larger commercial projects."
    },
    {
      question: "Are you licensed and insured?",
      answer: "Absolutely! We are fully licensed and carry comprehensive liability insurance for your protection and peace of mind."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash, check, and all major credit cards. Payment is due upon completion of services."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section className="section">
      <div className="container flex flex-col">
        <div className="flex flex-col relative leading-8 h-auto text-center" style={{
          color: 'rgba(0, 245, 255, 1)',
          fontSize: '59px',
          fontWeight: '700',
          letterSpacing: '-0.75px',
          margin: '25px auto 53px'
        }}>
          <p>FQA</p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="card">
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left flex justify-between items-center group focus:outline-none"
              >
                <h3 className="text-lg md:text-xl font-bold text-hackerGreen group-hover:text-hackerBlue transition-colors duration-300">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0 ml-4">
                  <span className={`text-2xl text-hackerBlue transition-transform duration-300 ${
                    openItem === index ? 'rotate-45' : 'rotate-0'
                  }`}>
                    +
                  </span>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                openItem === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
              }`}>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-base opacity-90 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-2xl font-semibold leading-7 opacity-80 mb-6">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:18705200650" 
              className="btn btn-primary"
            >
              📞 Call Us Now
            </a>
            <a 
              href="mailto:fosterdustin59022@gmail.com?subject=Question about cleaning services" 
              className="btn btn-outline"
            >
              ✉️ Send Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
