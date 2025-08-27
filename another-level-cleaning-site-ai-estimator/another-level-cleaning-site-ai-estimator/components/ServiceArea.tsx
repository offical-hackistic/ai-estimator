export default function ServiceArea() {
  const cities = [
    "Jonesboro",
    "Paragould", 
    "Blytheville",
    "Newport",
    "Pocahontas",
    "Walnut Ridge"
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="card text-center flex flex-col justify-start items-center">
            <h2 className="text-5xl md:text-6xl font-extrabold text-hackerBlue drop-shadow-glow mb-8 tracking-tight">Service Area</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {cities.map((city, i) => (
                <div key={i} className="flex items-center text-lg opacity-90">
                  <span className="text-hackerGreen mr-3">•</span>
                  <span>{city}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-hackerGreen font-semibold">
              Serving all of Northeast Arkansas with professional exterior cleaning services
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
