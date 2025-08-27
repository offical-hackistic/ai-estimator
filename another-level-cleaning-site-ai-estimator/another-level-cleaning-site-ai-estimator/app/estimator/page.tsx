"use client";
import { useState } from "react";

const services = [
  { key: "house", label: "House Wash" },
  { key: "windows", label: "Window Cleaning" },
  { key: "roof", label: "Roof Wash" },
  { key: "driveway", label: "Driveway / Concrete" },
  { key: "gutters", label: "Gutters" },
];

export default function EstimatorPage() {
  const [selected, setSelected] = useState("house");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
    setError(null); // Clear previous errors when new files are selected
  };

  const submit = async () => {
    setLoading(true); 
    setError(null); 
    setResult(null);
    
    try {
      const form = new FormData();
      form.append("service", selected);
      files.forEach((f) => form.append("images", f));
      
      const r = await fetch("/api/estimate", { method: "POST", body: form });
      
      if (!r.ok) {
        const errorData = await r.json().catch(() => ({ error: "Network error" }));
        throw new Error(errorData.message || errorData.error || `HTTP ${r.status}`);
      }
      
      const data = await r.json();
      setResult(data);
    } catch (e: any) {
      console.error("Estimation error:", e);
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container section">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-hackerBlue mb-4">AI-Powered Estimate</h1>
        <p className="opacity-90 mb-2">Upload a few exterior photos and select a service. Our AI analyzes surface area and complexity to price your clean.</p>
        <p className="text-sm opacity-70">Get instant pricing estimates for your cleaning project</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card md:col-span-1">
          <label className="block text-sm font-semibold mb-2 text-hackerGreen">Service Type</label>
          <select 
            value={selected} 
            onChange={(e) => setSelected(e.target.value)} 
            className="w-full bg-transparent border border-white/20 rounded-xl p-3 focus:border-hackerBlue focus:outline-none"
          >
            {services.map(s => <option key={s.key} value={s.key} className="bg-gray-800">{s.label}</option>)}
          </select>

          <label className="block text-sm font-semibold mt-6 mb-2 text-hackerGreen">
            Upload Photos ({files.length}/6)
          </label>
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            onChange={onFiles} 
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-hackerBlue file:text-black file:font-semibold hover:file:bg-hackerGreen transition-colors"
          />
          <p className="text-xs opacity-60 mt-1">2-6 photos recommended for best accuracy</p>

          <button 
            onClick={submit} 
            disabled={loading || files.length === 0} 
            className="btn btn-primary mt-6 w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Analyzing Photos..." : "Get Estimate"}
          </button>
          
          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>

        <div className="card md:col-span-2">
          <h2 className="text-2xl font-bold text-hackerGreen mb-4">Estimate Results</h2>
          
          {!result && !loading && (
            <div className="text-center py-8 opacity-70">
              <div className="text-4xl mb-4">📊</div>
              <p>Your detailed price breakdown will appear here after analysis.</p>
            </div>
          )}
          
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin text-4xl mb-4">⚡</div>
              <p className="text-hackerBlue">Analyzing your photos...</p>
            </div>
          )}
          
          {result && (
            <div className="space-y-4">
              <div className="text-center p-6 bg-hackerGreen/10 border border-hackerGreen/20 rounded-xl">
                <div className="text-3xl font-bold text-hackerGreen mb-2">
                  ${result.total.toFixed(2)}
                </div>
                <p className="text-sm opacity-90">Estimated Total Price</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="opacity-90">Estimated Area:</span>
                    <span className="font-semibold">{Math.round(result.area_sqft)} sq ft</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="opacity-90">Complexity Level:</span>
                    <span className="font-semibold">{result.complexity.toFixed(1)}/5</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="opacity-90">Service Rate:</span>
                    <span className="font-semibold">${result.rate.toFixed(2)}/sq ft</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="opacity-90">Complexity Factor:</span>
                    <span className="font-semibold">×{result.complexity_factor.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="opacity-90">Photos Analyzed:</span>
                    <span className="font-semibold">{result.images_analyzed}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="opacity-90">Method:</span>
                    <span className="font-semibold">
                      {result.estimation_method === "ai" ? "AI Analysis" : "Smart Estimate"}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <p className="text-sm opacity-90">
                  <strong>Analysis Notes:</strong> {result.notes}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card mt-8">
        <div className="text-center">
          <h3 className="text-xl font-bold text-hackerBlue mb-2">Ready to Book?</h3>
          <p className="text-sm opacity-80 mb-4">
            Estimates are based on visible exterior area and complexity. Final price may vary after on-site confirmation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:18705200650" 
              className="btn btn-primary"
            >
              📞 Call 870-520-0650
            </a>
            <a 
              href="mailto:fosterdustin59022@gmail.com?subject=Cleaning Service Quote" 
              className="btn btn-outline"
            >
              ✉️ Email for Quote
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
