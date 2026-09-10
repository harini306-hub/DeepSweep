import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { TrendingUp, AlertTriangle, ScanLine, Target, Plus } from "lucide-react";

const areaData = [
  { day: "Aug 12", detections: 14 }, { day: "Aug 15", detections: 22 },
  { day: "Aug 18", detections: 18 }, { day: "Aug 21", detections: 31 },
  { day: "Aug 24", detections: 27 }, { day: "Aug 27", detections: 19 },
  { day: "Aug 30", detections: 38 }, { day: "Sep 02", detections: 42 },
  { day: "Sep 05", detections: 35 }, { day: "Sep 08", detections: 51 },
];

const donutData = [
  { name: "Plastic", value: 38, color: "#FF4D4D" },
  { name: "Metal", value: 22, color: "#FB923C" },
  { name: "Fishing Net", value: 18, color: "#A78BFA" },
  { name: "Natural", value: 14, color: "#34D399" },
  { name: "Unknown", value: 8, color: "#64748B" },
];

const recentScans = [
  { id: "#1042", file: "deep_zone_4_scan.png", date: "Sep 10, 09:14", count: 12, status: "Completed" },
  { id: "#1041", file: "reef_survey_south.tiff", date: "Sep 10, 07:02", count: 7, status: "Completed" },
  { id: "#1040", file: "coastal_multibeam.jpg", date: "Sep 09, 22:31", count: 0, status: "Processing" },
  { id: "#1039", file: "trench_sector_b.png", date: "Sep 09, 15:44", count: 19, status: "Completed" },
  { id: "#1038", file: "estuary_scan_003.tiff", date: "Sep 08, 11:20", count: 3, status: "Failed" },
];

const statusStyle: Record<string, string> = {
  Completed: "bg-emerald-400/15 text-emerald-400",
  Processing: "bg-amber-400/15 text-amber-400",
  Failed: "bg-red-500/15 text-red-400",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel rounded-lg px-3 py-2 text-xs">
        <div className="text-slate-400 mb-1">{label}</div>
        <div className="text-cyan-400 font-semibold">{payload[0].value} detections</div>
      </div>
    );
  }
  return null;
};

interface DashboardProps {
  onNavigate: (screen: any) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="page-bg min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-2xl mb-1">Welcome back, Dr. Rivera</h1>
          <p className="text-slate-500 text-sm">Here's your detection activity overview for September 2026.</p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Scans", value: "1,042", icon: ScanLine, accent: "#22D3EE", trend: "+12%" },
            { label: "Debris Detected", value: "8,431", icon: AlertTriangle, accent: "#FF4D4D", trend: "+7%" },
            { label: "Avg Confidence", value: "91.4%", icon: Target, accent: "#34D399", trend: "+2.1%" },
            { label: "Active Alerts", value: "4", icon: TrendingUp, accent: "#FBBF24", trend: "!!" },
          ].map((kpi) => (
            <div key={kpi.label} className="glass-panel rounded-2xl p-5 hover-glow">
              <div className="flex items-start justify-between mb-4">
                <div className="text-sm text-slate-400">{kpi.label}</div>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${kpi.accent}18` }}
                >
                  <kpi.icon size={16} style={{ color: kpi.accent }} />
                </div>
              </div>
              <div className="font-display font-bold text-2xl" style={{ color: kpi.accent }}>
                {kpi.value}
              </div>
              <div className="text-xs text-slate-500 mt-1 font-mono-data">{kpi.trend} this month</div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Area chart */}
          <div className="lg:col-span-2 glass-panel rounded-2xl p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-display font-semibold text-base">Detections Over Time</h3>
                <div className="text-xs text-slate-500 mt-0.5">Last 30 days</div>
              </div>
              <div className="text-xs font-mono-data text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">LIVE</div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={areaData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="detections"
                  stroke="#22D3EE"
                  strokeWidth={2}
                  fill="url(#cyanGrad)"
                  dot={{ fill: "#22D3EE", r: 3, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Donut chart */}
          <div className="glass-panel rounded-2xl p-5">
            <h3 className="font-display font-semibold text-base mb-1">Debris Distribution</h3>
            <div className="text-xs text-slate-500 mb-3">By classification type</div>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  dataKey="value"
                  strokeWidth={2}
                  stroke="#050D17"
                >
                  {donutData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: any) => [`${v}%`, ""]} contentStyle={{ background: "#0D2436", border: "1px solid rgba(34,211,238,0.2)", borderRadius: 8, fontSize: 12, color: "#e2f0ff" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {donutData.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    <span className="text-slate-400">{d.name}</span>
                  </div>
                  <span className="font-mono-data text-slate-300">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent scans */}
        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-cyan-400/10">
            <h3 className="font-display font-semibold text-base">Recent Scans</h3>
            <button onClick={() => onNavigate("history")} className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
              View all →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cyan-400/8">
                  {["ID", "File", "Date", "Detected", "Status"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentScans.map((scan, i) => (
                  <tr key={scan.id} className="border-b border-cyan-400/5 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3.5 font-mono-data text-xs text-cyan-400">{scan.id}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-300 max-w-[180px] truncate">{scan.file}</td>
                    <td className="px-5 py-3.5 text-xs text-slate-500 font-mono-data whitespace-nowrap">{scan.date}</td>
                    <td className="px-5 py-3.5 text-sm font-semibold" style={{ color: scan.count > 0 ? "#FF4D4D" : "#64748B" }}>
                      {scan.count > 0 ? scan.count : "—"}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[scan.status]}`}>
                        {scan.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => onNavigate("upload")}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-cyan-400 flex items-center justify-center shadow-lg hover:bg-cyan-300 transition-all active:scale-95 animate-pulse-glow z-50"
        style={{ color: "#050D17" }}
        title="New Scan"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}
