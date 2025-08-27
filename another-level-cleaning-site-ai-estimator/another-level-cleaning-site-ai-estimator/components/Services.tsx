export default function Services() {
  const services = [
    { title: "House Wash", desc: "Low-pressure soft wash that lifts algae and grime without damage." },
    { title: "Window Cleaning", desc: "Crystal-clear windows inside & out, frames and tracks included." },
    { title: "Roof Wash", desc: "Gentle treatment removes dark streaks and extends shingle life." },
    { title: "Driveway & Concrete", desc: "Deep clean oil, mildew, and rust for a bright, even finish." },
    { title: "Gutters", desc: "Debris removal and rinse; downspouts flushed for smooth flow." },
  ];
  return (
    <section id="services" className="section">
      <div className="container flex flex-col">
        <div className="flex flex-col relative h-auto text-center" style={{
          textShadow: '1px 2px 7px #02e688',
          margin: '20px auto',
          font: '300 73px Amaranth, sans-serif'
        }}>
          <h2>
            <strong style={{color: 'rgb(80, 227, 194)'}}>Our Services </strong>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s,i)=> (
            <div key={i} className="card">
              <h3 className="text-2xl font-bold text-hackerGreen">{s.title}</h3>
              <p className="mt-2 opacity-90">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
