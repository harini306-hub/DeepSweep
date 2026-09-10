import { Upload, Play, Cpu, Tag, Zap, Award, MapPin, Download, GitFork, Globe, Waves } from "lucide-react";
import SonarAnimation from "../components/SonarAnimation";

interface LandingProps {
  onEnterApp: () => void;
}

const features = [
  { icon: Cpu, title: "Object Detection", desc: "YOLO-based real-time detection of debris and marine structures in sonar imagery." },
  { icon: Tag, title: "Classification", desc: "11+ object classes: plastic, metal, fishing nets, rocks, coral, and more." },
  { icon: Zap, title: "Noise Handling", desc: "Advanced filtering removes sonar artifacts while preserving faint debris signals." },
  { icon: Award, title: "Confidence Scoring", desc: "Per-detection confidence percentages with adjustable minimum threshold." },
  { icon: MapPin, title: "Location Mapping", desc: "GPS-tagged detections plotted on interactive debris density maps." },
  { icon: Download, title: "Exportable Reports", desc: "Download PDF summaries or raw CSV/JSON data for further analysis." },
];

export default function Landing({ onEnterApp }: LandingProps) {
  return (
    <div className="page-bg text-slate-200">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-cyan-400/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-8">
          <div className="flex items-center gap-2 font-display font-bold text-lg text-cyan-gradient">
            <Waves size={22} className="text-cyan-400" />
            AquaScan AI
          </div>
          <div className="hidden md:flex items-center gap-7 mx-auto text-sm text-slate-400">
            {["Home", "Features", "How It Works", "Demo", "Contact"].map((item) => (
              <a key={item} href="#" className="hover:text-cyan-400 transition-colors">{item}</a>
            ))}
          </div>
          <button
            onClick={onEnterApp}
            className="ml-auto px-5 py-2 rounded-lg bg-cyan-400 text-navy-950 font-semibold text-sm hover:bg-cyan-300 transition-all active:scale-95"
            style={{ color: "#050D17" }}
          >
            Try Demo
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-20">
          {/* Left content */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-xs text-cyan-400 font-medium mb-6 font-mono-data">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              AI-Powered Marine Research Platform
            </div>
            <h1 className="font-display font-extrabold leading-tight mb-6" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
              Detect Marine Debris
              <br />
              <span className="text-cyan-gradient">Before It Destroys</span>
              <br />
              Our Oceans
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-md">
              AI-powered sonar analysis that identifies, classifies, and maps underwater debris in real-time with 98.5% accuracy.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={onEnterApp}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-400 font-semibold text-sm hover:bg-cyan-300 transition-all active:scale-95 animate-pulse-glow"
                style={{ color: "#050D17" }}
              >
                <Upload size={16} />
                Upload Sonar Image
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-cyan-400/40 text-cyan-400 font-semibold text-sm hover:bg-cyan-400/10 transition-all">
                <Play size={16} />
                Watch Demo
              </button>
            </div>
          </div>

          {/* Sonar visual */}
          <div className="relative flex items-center justify-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 rounded-full" style={{
                background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)"
              }} />
              <SonarAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="py-8 border-y border-cyan-400/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "98.5%", label: "Detection Accuracy" },
              { value: "11+", label: "Object Classes" },
              { value: "<2s", label: "Real-Time Processing" },
              { value: "SNR-resistant", label: "Noise-Resistant AI" },
            ].map((stat) => (
              <div key={stat.label} className="glass-panel rounded-2xl p-5 hover-glow text-center">
                <div className="font-display font-bold text-2xl text-cyan-gradient">{stat.value}</div>
                <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display font-bold text-3xl text-center mb-4">How It Works</h2>
          <p className="text-slate-400 text-center mb-14 max-w-xl mx-auto">Three steps from raw sonar data to actionable intelligence.</p>
          <div className="relative grid md:grid-cols-3 gap-8">
            {/* Dotted connector */}
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px border-t-2 border-dashed border-cyan-400/25" />
            {[
              { step: "01", icon: Upload, title: "Upload Sonar Image", desc: "Drop in your raw sonar scan in PNG, JPG, or TIFF format. Supports multi-beam and side-scan sonar outputs." },
              { step: "02", icon: Cpu, title: "AI Analysis", desc: "Our YOLO-based model processes the image, applying noise reduction and identifying every object of interest." },
              { step: "03", icon: Download, title: "Get Detection Report", desc: "Review annotated imagery with bounding boxes, confidence scores, and export structured data for your research." },
            ].map((step) => (
              <div key={step.step} className="glass-panel rounded-2xl p-6 hover-glow relative">
                <div className="font-mono-data text-xs text-cyan-400/60 mb-4">STEP {step.step}</div>
                <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center mb-4 border border-cyan-400/20">
                  <step.icon size={22} className="text-cyan-400" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 border-t border-cyan-400/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display font-bold text-3xl text-center mb-4">Platform Capabilities</h2>
          <p className="text-slate-400 text-center mb-14 max-w-xl mx-auto">Built for marine researchers, environmental agencies, and conservation teams.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass-panel rounded-2xl p-6 hover-glow group">
                <div className="w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center mb-4 border border-cyan-400/15 group-hover:bg-cyan-400/20 transition-colors">
                  <f.icon size={18} className="text-cyan-400" />
                </div>
                <h3 className="font-display font-semibold text-base mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-panel rounded-3xl p-12 border border-cyan-400/15 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{
              background: "radial-gradient(ellipse at 50% 50%, rgba(34,211,238,0.15) 0%, transparent 70%)"
            }} />
            <h2 className="font-display font-bold text-3xl mb-4 relative z-10">
              Ready to protect our oceans?
            </h2>
            <p className="text-slate-400 mb-8 relative z-10">Upload your first sonar scan and get AI-powered detection results in under 3 seconds.</p>
            <button
              onClick={onEnterApp}
              className="px-8 py-3 rounded-lg bg-cyan-400 font-semibold hover:bg-cyan-300 transition-all active:scale-95 relative z-10"
              style={{ color: "#050D17" }}
            >
              Start Scanning Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-400/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 font-display font-bold text-lg text-cyan-gradient mb-3">
                <Waves size={20} className="text-cyan-400" />
                AquaScan AI
              </div>
              <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                Marine debris detection platform powered by deep learning and acoustic sonar analysis.
              </p>
              <div className="flex gap-3 mt-4">
                {[GitFork, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 flex items-center justify-center rounded-lg border border-cyan-400/15 text-slate-500 hover:text-cyan-400 hover:border-cyan-400/40 transition-all">
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Product", links: ["Features", "How It Works", "Pricing", "Changelog"] },
              { title: "Resources", links: ["Documentation", "API Reference", "Research Papers", "Contact"] },
            ].map((col) => (
              <div key={col.title}>
                <div className="font-semibold text-sm mb-3 text-slate-300">{col.title}</div>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-slate-500 hover:text-cyan-400 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-cyan-400/10 pt-6 text-center text-xs text-slate-600">
            © 2026 AquaScan AI. Built for ocean conservation research. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
