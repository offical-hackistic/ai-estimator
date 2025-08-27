export default function TransparentPricing() {
  return (
    <section id="pricing" className="section">
      <div className="container flex flex-col">
        <div className="flex flex-col relative mt-5 h-auto text-center" style={{
          textShadow: '1px 3px 40px #01e788',
          font: '73px Outfit, sans-serif'
        }}>
          <h2>
            <strong style={{color: 'rgb(80, 227, 194)'}}>
              Transparent Pricing
            </strong>
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto text-center mb-12 flex flex-col">
          <div className="flex flex-col relative h-auto mt-5 mx-auto" style={{
            font: '30px Outfit, sans-serif'
          }}>
            <p>
              <strong style={{color: 'rgb(0, 241, 251)'}}>
                No Hidden Fees. No Surprises. Just honest pricing for quality service
              </strong>
            </p>
          </div>
          <p className="opacity-90 text-hackerGreen border border-solid text-[27px] leading-[31px] font-medium mt-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Get a free instant estimate simply Tap on the GET AI ESTIMATE button, Upload a few photos of the property and your done. Its that easy!
          </p>
        </div>
        
        {/* Large AI Estimate Button */}
        <div className="flex justify-center">
          <a 
            href="/estimator" 
            className="btn btn-primary text-xl md:text-2xl px-12 py-6 w-full max-w-2xl text-center font-bold hover:brightness-110 transition-all duration-300 shadow-2xl"
          >
            🎯 GET AI ESTIMATE
          </a>
        </div>
      </div>
    </section>
  );
}
