import { useState } from "react";
import {
  ZoomIn, ZoomOut, Maximize2, Eye, EyeOff, Download, Share2, Save,
  ChevronDown, Tag,
} from "lucide-react";

const objects = [
  { id: 1, type: "Plastic", conf: 94, x: 342, y: 187, w: 68, h: 52, color: "#FF4D4D", natural: false, bbox: { left: "18%", top: "22%", width: "10%", height: "14%" } },
  { id: 2, type: "Fishing Net", conf: 88, x: 521, y: 264, w: 112, h: 78, color: "#A78BFA", natural: false, bbox: { left: "52%", top: "34%", width: "18%", height: "22%" } },
  { id: 3, type: "Rock", conf: 97, x: 178, y: 312, w: 84, h: 64, color: "#34D399", natural: true, bbox: { left: "8%", top: "44%", width: "13%", height: "18%" } },
  { id: 4, type: "Metal", conf: 79, x: 644, y: 155, w: 56, h: 44, color: "#FB923C", natural: false, bbox: { left: "68%", top: "18%", width: "9%", height: "12%" } },
  { id: 5, type: "Plastic", conf: 85, x: 412, y: 398, w: 48, h: 36, color: "#FF4D4D", natural: false, bbox: { left: "38%", top: "56%", width: "8%", height: "10%" } },
  { id: 6, type: "Coral", conf: 92, x: 265, y: 205, w: 72, h: 60, color: "#34D399", natural: true, bbox: { left: "24%", top: "28%", width: "11%", height: "17%" } },
  { id: 7, type: "Unknown", conf: 63, x: 580, y: 420, w: 44, h: 38, color: "#64748B", natural: false, bbox: { left: "60%", top: "60%", width: "7%", height: "10%" } },
  { id: 8, type: "Plastic", conf: 91, x: 134, y: 174, w: 60, h: 48, color: "#FF4D4D", natural: false, bbox: { left: "5%", top: "21%", width: "9%", height: "13%" } },
  { id: 9, type: "Metal", conf: 76, x: 720, y: 310, w: 52, h: 42, color: "#FB923C", natural: false, bbox: { left: "76%", top: "43%", width: "8%", height: "12%" } },
  { id: 10, type: "Rock", conf: 98, x: 460, y: 130, w: 88, h: 70, color: "#34D399", natural: true, bbox: { left: "44%", top: "15%", width: "14%", height: "20%" } },
  { id: 11, type: "Fishing Net", conf: 82, x: 310, y: 460, w: 98, h: 64, color: "#A78BFA", natural: false, bbox: { left: "28%", top: "65%", width: "16%", height: "18%" } },
  { id: 12, type: "Plastic", conf: 71, x: 660, y: 390, w: 42, h: 34, color: "#FF4D4D", natural: false, bbox: { left: "70%", top: "55%", width: "7%", height: "9%" } },
];

const ConfRing = ({ conf, color }: { conf: number; color: string }) => {
  const r = 14;
  const circ = 2 * Math.PI * r;
  const dash = (conf / 100) * circ;
  return (
    <svg width={36} height={36} viewBox="0 0 36 36" className="rotate-[-90deg]">
      <circle cx={18} cy={18} r={r} fill="none" stroke="#1E3A4F" strokeWidth={3} />
      <circle
        cx={18} cy={18} r={r} fill="none"
        stroke={color} strokeWidth={3}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
      />
      <text
        x={18} y={18}
        textAnchor="middle" dominantBaseline="middle"
        className="rotate-90"
        style={{ transform: "rotate(90deg) translate(0, -36px)", fontSize: 9, fill: "#e2f0ff", fontFamily: "JetBrains Mono" }}
      >
        {conf}
      </text>
    </svg>
  );
};

export default function Results() {
  const [showBoxes, setShowBoxes] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("confidence");

  const debrisCount = objects.filter((o) => !o.natural).length;
  const naturalCount = objects.filter((o) => o.natural).length;

  const filtered = objects
    .filter((o) => filter === "all" || (filter === "debris" && !o.natural) || (filter === "natural" && o.natural))
    .sort((a, b) => sortBy === "confidence" ? b.conf - a.conf : a.type.localeCompare(b.type));

  return (
    <div className="page-bg min-h-screen flex flex-col">
      {/* Summary strip */}
      <div className="glass-panel border-b border-cyan-400/10 px-6 py-3 flex flex-wrap items-center gap-4">
        <span className="font-mono-data text-sm text-slate-400">
          <span className="text-slate-200 font-semibold">{objects.length}</span> Objects Detected
        </span>
        <span className="text-slate-600">|</span>
        <span className="font-mono-data text-sm"><span className="text-red-400 font-semibold">{debrisCount}</span> Debris</span>
        <span className="text-slate-600">|</span>
        <span className="font-mono-data text-sm"><span className="text-emerald-400 font-semibold">{naturalCount}</span> Natural</span>
        <span className="text-slate-600">|</span>
        <span className="font-mono-data text-sm text-slate-400">Processing Time: <span className="text-cyan-400">2.3s</span></span>
        <span className="font-mono-data text-xs text-amber-400 ml-auto">scan_reef_zone4.tiff</span>
      </div>

      {/* Split view */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden" style={{ minHeight: 0 }}>
        {/* Left — image */}
        <div className="lg:w-[60%] flex flex-col bg-navy-950 border-r border-cyan-400/10">
          {/* Controls */}
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-cyan-400/10">
            <button onClick={() => setZoom(Math.max(0.5, zoom - 0.25))} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/4 border border-cyan-400/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all">
              <ZoomOut size={14} />
            </button>
            <span className="font-mono-data text-xs text-slate-400">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(Math.min(2, zoom + 0.25))} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/4 border border-cyan-400/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all">
              <ZoomIn size={14} />
            </button>

            <div className="h-4 w-px bg-cyan-400/15 mx-1" />

            <button
              onClick={() => setShowBoxes(!showBoxes)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all ${showBoxes ? "border-cyan-400/40 text-cyan-400 bg-cyan-400/8" : "border-cyan-400/15 text-slate-500"}`}
            >
              {showBoxes ? <Eye size={13} /> : <EyeOff size={13} />}
              Boxes
            </button>
            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all ${showLabels ? "border-cyan-400/40 text-cyan-400 bg-cyan-400/8" : "border-cyan-400/15 text-slate-500"}`}
            >
              <Tag size={13} />
              Labels
            </button>

            <button className="ml-auto w-8 h-8 flex items-center justify-center rounded-lg bg-white/4 border border-cyan-400/10 text-slate-400 hover:text-cyan-400 transition-all">
              <Maximize2 size={14} />
            </button>
          </div>

          {/* Image canvas */}
          <div className="flex-1 overflow-hidden flex items-center justify-center p-6">
            <div
              className="relative rounded-xl overflow-hidden"
              style={{
                transform: `scale(${zoom})`,
                transition: "transform 0.2s ease",
                background: "linear-gradient(145deg, #061420 0%, #091c30 40%, #06111e 100%)",
                width: "100%",
                maxWidth: 680,
                aspectRatio: "4/3",
              }}
            >
              {/* Simulated sonar image texture */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: "radial-gradient(ellipse at 30% 60%, rgba(34,211,238,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(34,211,238,0.05) 0%, transparent 40%)",
              }} />
              <div className="absolute inset-0 opacity-15" style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 12px, rgba(34,211,238,0.06) 12px, rgba(34,211,238,0.06) 13px)",
              }} />

              {/* Bounding boxes */}
              {showBoxes && objects.map((obj, i) => (
                <div
                  key={obj.id}
                  className="absolute animate-bbox"
                  style={{
                    left: obj.bbox.left,
                    top: obj.bbox.top,
                    width: obj.bbox.width,
                    height: obj.bbox.height,
                    border: `2px solid ${obj.color}`,
                    borderRadius: 4,
                    boxShadow: `0 0 8px ${obj.color}44`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                >
                  {showLabels && (
                    <div
                      className="absolute -top-5 left-0 px-1.5 py-0.5 rounded text-xs font-mono-data whitespace-nowrap"
                      style={{ background: obj.color, color: "#050D17", fontSize: 9 }}
                    >
                      {obj.type} {obj.conf}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — objects list */}
        <div className="lg:w-[40%] flex flex-col overflow-hidden">
          {/* Sort/filter */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-cyan-400/10">
            <div className="relative flex-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none px-3 py-1.5 rounded-lg bg-white/4 border border-cyan-400/10 text-xs text-slate-300 focus:outline-none focus:border-cyan-400/30 pr-7"
              >
                <option value="confidence">Sort: Confidence</option>
                <option value="type">Sort: Type</option>
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
            <div className="relative flex-1">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full appearance-none px-3 py-1.5 rounded-lg bg-white/4 border border-cyan-400/10 text-xs text-slate-300 focus:outline-none focus:border-cyan-400/30 pr-7"
              >
                <option value="all">All Objects</option>
                <option value="debris">Debris Only</option>
                <option value="natural">Natural Only</option>
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* Scrollable list */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filtered.map((obj) => (
              <div key={obj.id} className="glass-panel rounded-xl p-3 hover-glow flex items-center gap-3 cursor-pointer">
                {/* Thumbnail stub */}
                <div
                  className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold border"
                  style={{ borderColor: `${obj.color}40`, background: `${obj.color}12`, color: obj.color }}
                >
                  {obj.id}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: obj.color }} />
                    <span className="text-sm font-medium text-slate-200">{obj.type}</span>
                    {!obj.natural && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-red-500/15 text-red-400">DEBRIS</span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 font-mono-data">
                    X: {obj.x} · Y: {obj.y} · {obj.w}×{obj.h}px
                  </div>
                </div>
                <ConfRing conf={obj.conf} color={obj.color} />
              </div>
            ))}
          </div>

          {/* Action bar */}
          <div className="border-t border-cyan-400/10 p-4 flex flex-wrap gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-400 text-xs font-semibold hover:bg-cyan-300 transition-all" style={{ color: "#050D17" }}>
              <Download size={13} />
              PDF Report
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-cyan-400/25 text-xs text-cyan-400 hover:bg-cyan-400/8 transition-all">
              <Download size={13} />
              CSV/JSON
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-cyan-400/25 text-xs text-slate-400 hover:text-slate-200 hover:bg-white/4 transition-all">
              <Save size={13} />
              Save
            </button>
            <button className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-lg border border-cyan-400/15 text-xs text-slate-500 hover:text-slate-300 transition-all">
              <Share2 size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
