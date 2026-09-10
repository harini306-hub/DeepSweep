import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";
import { Download, ChevronDown, ArrowUpDown } from "lucide-react";
import { useState } from "react";

const barData = [
  { type: "Plastic", count: 312, color: "#FF4D4D" },
  { type: "Metal", count: 187, color: "#FB923C" },
  { type: "Net", count: 154, color: "#A78BFA" },
  { type: "Unknown", count: 68, color: "#64748B" },
];

const lineData = [
  { date: "Aug 12", accuracy: 91.2 },
  { date: "Aug 17", accuracy: 92.8 },
  { date: "Aug 22", accuracy: 90.5 },
  { date: "Aug 27", accuracy: 93.4 },
  { date: "Sep 01", accuracy: 94.1 },
  { date: "Sep 06", accuracy: 93.7 },
  { date: "Sep 10", accuracy: 95.2 },
];

const confDist = [
  { name: "High (>85%)", value: 58, color: "#34D399" },
  { name: "Medium (65–85%)", value: 30, color: "#FBBF24" },
  { name: "Low (<65%)", value: 12, color: "#FF4D4D" },
];

const history = [
  { id: "#1042", date: "Sep 10, 09:14", location: "Zone 4 — Pacific", found: 12, debris: 8, accuracy: "94.1%", status: "Completed" },
  { id: "#1041", date: "Sep 10, 07:02", location: "South Reef — Hawaii", found: 7, debris: 4, accuracy: "91.8%", status: "Completed" },
  { id: "#1040", date: "Sep 09, 22:31", location: "Coastal Survey B", found: 0, debris: 0, accuracy: "—", status: "Processing" },
  { id: "#1039", date: "Sep 09, 15:44", location: "Trench Sector B", found: 19, debris: 14, accuracy: "89.3%", status: "Completed" },
  { id: "#1038", date: "Sep 08, 11:20", location: "Estuary Grid 3", found: 3, debris: 2, accuracy: "78.5%", status: "Completed" },
  { id: "#1037", date: "Sep 07, 16:01", location: "Open Ocean 7°N", found: 0, debris: 0, accuracy: "—", status: "Failed" },
];

const statusStyle: Record<string, string> = {
  Completed: "bg-emerald-400/15 text-emerald-400",
  Processing: "bg-amber-400/15 text-amber-400",
  Failed: "bg-red-500/15 text-red-400",
};

const TT = ({ active, payload, label }: any) =>
  active && payload?.length ? (
    <div className="glass-panel rounded-lg px-3 py-2 text-xs">
      <div className="text-slate-400 mb-1">{label}</div>
      <div className="text-cyan-400 font-semibold">{payload[0].value}{typeof payload[0].value === "number" && payload[0].name === "accuracy" ? "%" : ""}</div>
    </div>
  ) : null;

export default function Analytics() {
  const [range, setRange] = useState("30d");

  return (
    <div className="page-bg min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-2xl mb-1">Analytics & Insights</h1>
            <p className="text-slate-500 text-sm">Detection patterns and accuracy trends over time.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="appearance-none pl-4 pr-8 py-2 rounded-lg bg-white/4 border border-cyan-400/15 text-sm text-slate-300 focus:outline-none focus:border-cyan-400/40"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="custom">Custom range</option>
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-400/25 text-xs text-cyan-400 hover:bg-cyan-400/8 transition-all">
              <Download size={13} />
              Export All
            </button>
          </div>
        </div>

        {/* Charts grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Bar chart */}
          <div className="glass-panel rounded-2xl p-5">
            <h3 className="font-display font-semibold text-base mb-1">Debris Detected by Type</h3>
            <div className="text-xs text-slate-500 mb-5">Total counts per category</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<TT />} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line chart */}
          <div className="glass-panel rounded-2xl p-5">
            <h3 className="font-display font-semibold text-base mb-1">Detection Accuracy Trend</h3>
            <div className="text-xs text-slate-500 mb-5">Model confidence over time</div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={[88, 97]} tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<TT />} />
                <Line
                  type="monotone" dataKey="accuracy" name="accuracy"
                  stroke="#22D3EE" strokeWidth={2.5}
                  dot={{ fill: "#22D3EE", r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Confidence distribution pie */}
          <div className="glass-panel rounded-2xl p-5">
            <h3 className="font-display font-semibold text-base mb-1">Confidence Distribution</h3>
            <div className="text-xs text-slate-500 mb-3">High / Medium / Low buckets</div>
            <div className="flex items-center gap-8">
              <ResponsiveContainer width="50%" height={180}>
                <PieChart>
                  <Pie data={confDist} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="#050D17" strokeWidth={2}>
                    {confDist.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => [`${v}%`, ""]} contentStyle={{ background: "#0D2436", border: "1px solid rgba(34,211,238,0.2)", borderRadius: 8, fontSize: 12, color: "#e2f0ff" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {confDist.map((d) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                    <div>
                      <div className="text-xs text-slate-400">{d.name}</div>
                      <div className="font-mono-data text-sm font-semibold" style={{ color: d.color }}>{d.value}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Debris density heatmap */}
          <div className="glass-panel rounded-2xl p-5">
            <h3 className="font-display font-semibold text-base mb-1">Debris Density by Location</h3>
            <div className="text-xs text-slate-500 mb-4">Detection hotspots (Pacific sector)</div>
            <div className="relative rounded-xl overflow-hidden h-[180px] bg-navy-900 border border-cyan-400/10">
              {/* Simple grid heatmap simulation */}
              <div className="absolute inset-0 grid" style={{ gridTemplateColumns: "repeat(10, 1fr)", gridTemplateRows: "repeat(6, 1fr)" }}>
                {Array.from({ length: 60 }).map((_, i) => {
                  const heat = Math.random();
                  const alpha = heat * 0.7;
                  const color = heat > 0.7 ? `rgba(255,77,77,${alpha})` : heat > 0.4 ? `rgba(251,146,60,${alpha * 0.7})` : `rgba(34,211,238,${alpha * 0.3})`;
                  return <div key={i} style={{ background: color }} />;
                })}
              </div>
              <div className="absolute bottom-2 right-3 flex items-center gap-2 text-xs text-slate-500">
                <div className="flex gap-1 items-center">
                  <div className="w-3 h-2 rounded-sm bg-cyan-400/40" />Low
                </div>
                <div className="flex gap-1 items-center">
                  <div className="w-3 h-2 rounded-sm bg-orange-400/70" />Med
                </div>
                <div className="flex gap-1 items-center">
                  <div className="w-3 h-2 rounded-sm bg-red-500/80" />High
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full history table */}
        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-cyan-400/10">
            <h3 className="font-display font-semibold text-base">Full Scan History</h3>
            <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-200 transition-colors">
              <ArrowUpDown size={12} />
              Sort
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cyan-400/8">
                  {["Scan ID", "Date", "Location", "Objects", "Debris", "Accuracy", "Status", ""].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {history.map((row) => (
                  <tr key={row.id} className="border-b border-cyan-400/5 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3.5 font-mono-data text-xs text-cyan-400">{row.id}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-400 font-mono-data whitespace-nowrap">{row.date}</td>
                    <td className="px-4 py-3.5 text-sm text-slate-300 whitespace-nowrap">{row.location}</td>
                    <td className="px-4 py-3.5 text-sm font-semibold text-slate-200">{row.found || "—"}</td>
                    <td className="px-4 py-3.5 text-sm font-semibold" style={{ color: row.debris > 0 ? "#FF4D4D" : "#64748B" }}>{row.debris || "—"}</td>
                    <td className="px-4 py-3.5 font-mono-data text-xs" style={{ color: row.accuracy !== "—" ? "#34D399" : "#64748B" }}>{row.accuracy}</td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[row.status]}`}>{row.status}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap">View →</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
