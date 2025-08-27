export default function Footer() {
  return (
    <footer className="section border-t border-white/10">
      <div className="container">
        <div className="card">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            
            {/* Left Column - Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-hackerBlue rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-sm">AL</span>
                </div>
                <h3 className="text-xl font-bold text-white">Another Level Cleaning</h3>
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                Professional exterior cleaning services in Northeast Arkansas. Taking your property maintenance to another level with AI-powered estimates and exceptional service.
              </p>
              <div className="mt-4 text-xs opacity-70">
                <p>Licensed & Insured</p>
                <p>Serving Northeast Arkansas since 2020</p>
              </div>
            </div>

            {/* Middle Column - Services */}
            <div>
              <h3 className="text-lg font-bold text-hackerGreen mb-4 tracking-tight">Services</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>Window Cleaning</li>
                <li>Gutter Cleaning</li>
                <li>Pressure Washing</li>
                <li>Christmas Lights</li>
              </ul>
            </div>

            {/* Right Column - Contact Info */}
            <div>
              <h3 className="text-lg font-bold text-hackerGreen mb-4 tracking-tight">Contact Info</h3>
              <div className="space-y-2 text-sm opacity-90">
                <p>(870) 520-0650</p>
                <p>info@anotherlevelcleaning.com</p>
                <p>Jonesboro, AR 72401</p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs opacity-70">© 2024 Another Level Cleaning Services. All rights reserved.</p>
            <div className="flex gap-4 text-xs">
              <a href="#" className="text-hackerBlue hover:underline transition">system_status: operational</a>
              <span className="opacity-50">|</span>
              <a href="#" className="text-hackerBlue hover:underline transition">uptime: 99.9%</a>
              <span className="opacity-50">|</span>
              <a href="#" className="text-hackerBlue hover:underline transition">last_update: 2024</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
