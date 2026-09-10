import { useState } from "react";
import { LayoutGrid, List, Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const scans = [
  { id: "#1042", file: "deep_zone_4_scan.png", date: "Sep 10, 2026 09:14", location: "Zone 4 — Pacific", objects: 12, debris: 8, natural: 4, confidence: 94, status: "Completed" },
  { id: "#1041", file: "reef_survey_south.tiff", date: "Sep 10, 2026 07:02", location: "South Reef — Hawaii", objects: 7, debris: 4, natural: 3, confidence: 91, status: "Completed" },
  { id: "#1040", file: "coastal_multibeam.jpg", date: "Sep 09, 2026 22:31", location: "Coastal Survey B", objects: 0, debris: 0, natural: 0, confidence: 0, status: "Processing" },
  { id: "#1039", file: "trench_sector_b.png", date: "Sep 09, 2026 15:44", location: "Trench Sector B", objects: 19, debris: 14, natural: 5, confidence: 89, status: "Completed" },
  { id: "#1038", file: "estuary_scan_003.tiff", date: "Sep 08, 2026 11:20", location: "Estuary Grid 3", objects: 3, debris: 2, natural: 1, confidence: 78, status: "Completed" },
  { id: "#1037", file: "open_ocean_7N.png", date: "Sep 07, 2026 16:01", location: "Open Ocean 7°N", objects: 0, debris: 0, natural: 0, confidence: 0, status: "Failed" },
  { id: "#1036", file: "lagoon_east_survey.tiff", date: "Sep 06, 2026 13:45", location: "East Lagoon — Maldives", objects: 5, debris: 3, natural: 2, confidence: 87, status: "Completed" },
  { id: "#1035", file: "arctic_zone_a3.png", date: "Sep 05, 2026 08:00", location: "Arctic Zone A3", objects: 21, debris: 19, natural: 2, confidence: 96, status: "Completed" },
];

const statusStyle: Record<string, string> = {
  Completed: "bg-emerald-400/15 text-emerald-400",
  Processing: "bg-amber-400/15 text-amber-400",
  Failed: "bg-red-500/15 text-red-400",
};

interface HistoryProps {
  onNavigate: (screen: any) => void;
}

export default function History({ onNavigate }: HistoryProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = scans.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch = !q || s.file.toLowerCase().includes(q) || s.location.toLowerCase().includes(q) || s.id.includes(q);
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const pageSize = 6;
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const ScanCard = ({ scan }: { scan: typeof scans[0] }) => (
    <div className="glass-panel rounded-2xl p-5 hover-glow flex flex-col gap-4">
      {/* Thumbnail stub */}
      <div className="rounded-xl h-28 bg-navy-900 border border-cyan-400/10 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(ellipse at 40% 60%, rgba(34,211,238,0.15), transparent 60%)",
        }} />
        <div className="font-mono-data text-xs text-slate-600">{scan.file.split(".").pop()?.toUpperCase()}</div>
        <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[scan.status]}`}>
          {scan.status}
        </span>
      </div>
      <div>
        <div className="text-sm font-medium text-slate-200 truncate mb-0.5">{scan.file}</div>
        <div className="text-xs text-slate-500 font-mono-data">{scan.date}</div>
        <div className="text-xs text-slate-500 mt-0.5">{scan.location}</div>
      </div>
      <div className="flex gap-3">
        <div className="text-xs px-2.5 py-1 rounded-full bg-red-500/15 text-red-400 font-medium">
          {scan.debris} debris
        </div>
        <div className="text-xs px-2.5 py-1 rounded-full bg-emerald-400/15 text-emerald-400 font-medium">
          {scan.natural} natural
        </div>
      </div>
      {scan.confidence > 0 && (
        <div className="text-xs text-slate-500 font-mono-data">Avg conf: <span className="text-cyan-400">{scan.confidence}%</span></div>
      )}
      <button
        onClick={() => onNavigate("results")}
        className="w-full py-2 rounded-lg border border-cyan-400/25 text-xs text-cyan-400 hover:bg-cyan-400/8 transition-all font-medium"
      >
        View Details →
      </button>
    </div>
  );

  const ScanRow = ({ scan }: { scan: typeof scans[0] }) => (
    <tr className="border-b border-cyan-400/5 hover:bg-white/2 transition-colors">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-navy-900 border border-cyan-400/10 flex items-center justify-center text-xs font-mono-data text-slate-600 flex-shrink-0">
            {scan.file.split(".").pop()?.toUpperCase()}
          </div>
          <div>
            <div className="text-sm text-slate-200 font-medium truncate max-w-[180px]">{scan.file}</div>
            <div className="text-xs text-slate-500">{scan.location}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-xs font-mono-data text-slate-400 whitespace-nowrap">{scan.date}</td>
      <td className="px-4 py-4 text-sm font-semibold text-slate-200">{scan.objects || "—"}</td>
      <td className="px-4 py-4">
        <div className="flex gap-2">
          {scan.debris > 0 && <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/15 text-red-400">{scan.debris} debris</span>}
          {scan.natural > 0 && <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-400">{scan.natural} natural</span>}
          {!scan.debris && !scan.natural && <span className="text-xs text-slate-600">—</span>}
        </div>
      </td>
      <td className="px-4 py-4 font-mono-data text-xs" style={{ color: scan.confidence ? "#34D399" : "#64748B" }}>
        {scan.confidence ? `${scan.confidence}%` : "—"}
      </td>
      <td className="px-4 py-4">
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[scan.status]}`}>{scan.status}</span>
      </td>
      <td className="px-4 py-4">
        <button onClick={() => onNavigate("results")} className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap">
          View Details →
        </button>
      </td>
    </tr>
  );

  return (
    <div className="page-bg min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-2xl mb-1">Detection History</h1>
            <p className="text-slate-500 text-sm">{scans.length} total scans in your archive.</p>
          </div>
          <div className="flex items-center gap-2 p-1 rounded-xl bg-white/4 border border-cyan-400/10">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-cyan-400/20 text-cyan-400" : "text-slate-500 hover:text-slate-300"}`}
            >
              <List size={15} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-cyan-400/20 text-cyan-400" : "text-slate-500 hover:text-slate-300"}`}
            >
              <LayoutGrid size={15} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search scans, locations…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/4 border border-cyan-400/10 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-cyan-400/40 transition-all"
            />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="appearance-none pl-4 pr-8 py-2 rounded-lg bg-white/4 border border-cyan-400/10 text-sm text-slate-300 focus:outline-none focus:border-cyan-400/40 pr-8"
            >
              <option value="all">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Processing">Processing</option>
              <option value="Failed">Failed</option>
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* Content */}
        {viewMode === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {paged.map((scan) => <ScanCard key={scan.id} scan={scan} />)}
          </div>
        ) : (
          <div className="glass-panel rounded-2xl overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyan-400/10">
                    {["File / Location", "Date", "Objects", "Breakdown", "Confidence", "Status", ""].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paged.map((scan) => <ScanRow key={scan.id} scan={scan} />)}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-cyan-400/15 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${p === page ? "bg-cyan-400 text-navy-950" : "border border-cyan-400/15 text-slate-400 hover:border-cyan-400/40"}`}
                style={p === page ? { color: "#050D17" } : {}}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg border border-cyan-400/15 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
