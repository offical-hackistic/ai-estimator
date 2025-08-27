export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah M.",
      text: "Amazing work on our house wash! The team was professional and the results exceeded our expectations.",
      rating: 5
    },
    {
      name: "Mike R.",
      text: "Fast, reliable service. Our windows have never looked cleaner. Highly recommend!",
      rating: 5
    },
    {
      name: "Jennifer L.",
      text: "The AI estimator was spot-on and made scheduling so easy. Great communication throughout.",
      rating: 5
    }
  ];

  return (
    <section className="section">
      <div className="container flex flex-col">
        <div className="flex flex-col relative h-auto" style={{
          color: 'rgba(2, 245, 255, 1)',
          fontSize: '37px',
          letterSpacing: '-0.75px',
          fontWeight: '700',
          margin: '20px auto 34px'
        }}>
          <p>Testimonials</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="card">
              <div className="flex mb-2">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <span key={j} className="text-hackerGreen">★</span>
                ))}
              </div>
              <p className="opacity-90 mb-3">"{testimonial.text}"</p>
              <p className="text-hackerBlue font-semibold">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
