import { useState, useRef } from "react";
import { CloudUpload, X, ChevronDown, Loader2, CheckCircle } from "lucide-react";

interface UploadProps {
  onNavigate: (screen: any) => void;
}

type Phase = "idle" | "uploading" | "processing" | "done";

export default function Upload({ onNavigate }: UploadProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [file, setFile] = useState<{ name: string; size: string } | null>(null);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [noiseReduction, setNoiseReduction] = useState(true);
  const [enhanceLow, setEnhanceLow] = useState(false);
  const [showConf, setShowConf] = useState(true);
  const [confThreshold, setConfThreshold] = useState(65);
  const [modelVersion, setModelVersion] = useState("v1.2 Beta");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (name: string, bytes: number) => {
    const size = bytes > 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
    setFile({ name, size });
    setPhase("uploading");
    setProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) { p = 100; clearInterval(iv); setPhase("idle"); }
      setProgress(Math.min(p, 100));
    }, 180);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f.name, f.size);
  };

  const startAnalysis = () => {
    setPhase("processing");
    setProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 6;
      if (p >= 100) { p = 100; clearInterval(iv); setPhase("done"); }
      setProgress(Math.min(p, 100));
    }, 120);
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${value ? "bg-cyan-400" : "bg-slate-700"}`}
    >
      <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${value ? "translate-x-5" : ""}`} />
    </button>
  );

  return (
    <div className="page-bg min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-display font-bold text-2xl mb-1">Upload Sonar Image for Analysis</h1>
        <p className="text-slate-500 text-sm mb-8">Supported formats: .png, .jpg, .tiff — multi-beam and side-scan sonar</p>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Upload zone */}
          <div className="lg:col-span-3 space-y-4">
            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`relative rounded-2xl border-2 border-dashed p-12 flex flex-col items-center justify-center cursor-pointer transition-all ${
                dragging
                  ? "border-cyan-400 bg-cyan-400/8"
                  : "border-cyan-400/25 hover:border-cyan-400/50 hover:bg-cyan-400/4"
              }`}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".png,.jpg,.jpeg,.tiff"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f.name, f.size);
                }}
              />
              <div className={`w-16 h-16 rounded-2xl bg-cyan-400/10 flex items-center justify-center mb-5 border border-cyan-400/20 ${dragging ? "animate-float" : ""}`}>
                <CloudUpload size={32} className="text-cyan-400" />
              </div>
              <p className="text-slate-200 font-medium text-lg mb-1">Drag & drop your sonar image here</p>
              <p className="text-slate-500 text-sm mb-5">or</p>
              <div className="px-5 py-2 rounded-lg bg-cyan-400/15 border border-cyan-400/25 text-cyan-400 text-sm font-medium hover:bg-cyan-400/20 transition-colors">
                Browse Files
              </div>
              <p className="text-xs text-slate-600 mt-4">PNG, JPG, TIFF — max 50 MB per file</p>
            </div>

            {/* File preview card */}
            {file && (
              <div className="glass-panel rounded-xl p-4 flex items-center gap-3 animate-fade-in-up">
                <div className="w-12 h-12 rounded-lg bg-navy-700 border border-cyan-400/15 flex items-center justify-center text-xs font-mono-data text-slate-500 flex-shrink-0">
                  {file.name.split(".").pop()?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-200 truncate">{file.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{file.size}</div>
                  {phase === "uploading" && (
                    <div className="mt-2">
                      <div className="h-1 rounded-full bg-slate-700 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-cyan-400 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="text-xs text-cyan-400 mt-1 font-mono-data">{Math.round(progress)}% uploaded</div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => { setFile(null); setPhase("idle"); }}
                  className="text-slate-500 hover:text-red-400 transition-colors flex-shrink-0"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Processing state */}
            {phase === "processing" && (
              <div className="glass-panel rounded-xl p-5 animate-fade-in-up">
                <div className="relative overflow-hidden rounded-lg bg-navy-900 h-40 mb-4">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-sm">
                    Sonar image preview
                  </div>
                  {/* Scanning line */}
                  <div
                    className="absolute left-0 right-0 h-0.5 animate-scan-line"
                    style={{ background: "linear-gradient(90deg, transparent, #22D3EE, transparent)" }}
                  />
                  <div
                    className="absolute left-0 right-0 h-8"
                    style={{
                      animation: "scan-line 2.5s ease-in-out infinite alternate",
                      background: "linear-gradient(180deg, rgba(34,211,238,0.08) 0%, transparent 100%)",
                    }}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Loader2 size={16} className="text-cyan-400 animate-spin" />
                  <div className="flex-1">
                    <div className="text-sm text-slate-300 mb-1">Analyzing sonar patterns…</div>
                    <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-cyan-400 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-sm font-mono-data text-cyan-400">{Math.round(progress)}%</div>
                </div>
              </div>
            )}

            {/* Done state */}
            {phase === "done" && (
              <div className="glass-panel rounded-xl p-5 border border-emerald-400/25 animate-fade-in-up">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-emerald-400" />
                  <div>
                    <div className="text-sm font-medium text-emerald-400">Analysis complete!</div>
                    <div className="text-xs text-slate-500">12 objects detected in 2.3s</div>
                  </div>
                  <button
                    onClick={() => onNavigate("results")}
                    className="ml-auto px-4 py-2 rounded-lg bg-cyan-400 text-xs font-semibold hover:bg-cyan-300 transition-all"
                    style={{ color: "#050D17" }}
                  >
                    View Results →
                  </button>
                </div>
              </div>
            )}

            {/* Start button */}
            {file && phase === "idle" && (
              <button
                onClick={startAnalysis}
                className="w-full py-3.5 rounded-xl bg-cyan-400 font-display font-semibold text-base hover:bg-cyan-300 transition-all active:scale-98 animate-pulse-glow"
                style={{ color: "#050D17" }}
              >
                Start Analysis
              </button>
            )}
          </div>

          {/* Settings panel */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-panel rounded-2xl p-5">
              <h3 className="font-display font-semibold text-base mb-5">Analysis Settings</h3>
              <div className="space-y-5">
                {[
                  { label: "Enable Noise Reduction", desc: "Remove sonar artifacts", value: noiseReduction, onChange: () => setNoiseReduction(!noiseReduction) },
                  { label: "Enhance Low Resolution", desc: "Upscale before detection", value: enhanceLow, onChange: () => setEnhanceLow(!enhanceLow) },
                  { label: "Show Confidence Scores", desc: "Display % on each label", value: showConf, onChange: () => setShowConf(!showConf) },
                ].map((s) => (
                  <div key={s.label} className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm text-slate-200">{s.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{s.desc}</div>
                    </div>
                    <Toggle value={s.value} onChange={s.onChange} />
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-5 space-y-5">
              {/* Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-200">Min Confidence Threshold</span>
                  <span className="font-mono-data text-xs text-cyan-400">{confThreshold}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={confThreshold}
                  onChange={(e) => setConfThreshold(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
                <div className="flex justify-between text-xs text-slate-600 mt-1">
                  <span>0%</span><span>100%</span>
                </div>
              </div>

              {/* Dropdown */}
              <div>
                <div className="text-sm text-slate-200 mb-2">Detection Model Version</div>
                <div className="relative">
                  <select
                    value={modelVersion}
                    onChange={(e) => setModelVersion(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 rounded-lg bg-white/4 border border-cyan-400/15 text-sm text-slate-300 focus:outline-none focus:border-cyan-400/40 transition-all pr-8"
                  >
                    <option value="v1.0">AquaScan v1.0 (Stable)</option>
                    <option value="v1.2 Beta">AquaScan v1.2 Beta</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
                {modelVersion === "v1.2 Beta" && (
                  <div className="text-xs text-amber-400 mt-1.5">⚠ Beta — improved net detection, experimental</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
