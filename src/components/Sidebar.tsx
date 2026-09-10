import {
  LayoutDashboard,
  Upload,
  Clock,
  BarChart2,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Waves,
} from "lucide-react";

type Screen = "dashboard" | "upload" | "history" | "analytics" | "results";

interface SidebarProps {
  active: Screen;
  onNavigate: (screen: Screen) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const navItems: { id: Screen; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "upload", label: "Upload Scan", icon: Upload },
  { id: "history", label: "Detection History", icon: Clock },
  { id: "analytics", label: "Analytics", icon: BarChart2 },
  { id: "results", label: "Reports", icon: FileText },
];

export default function Sidebar({ active, onNavigate, collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className="fixed left-0 top-0 h-full z-40 flex flex-col glass-panel transition-all duration-300"
      style={{ width: collapsed ? 64 : 240 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-cyan-400/10">
        <div className="w-8 h-8 flex-shrink-0 relative flex items-center justify-center">
          <Waves size={20} className="text-cyan-400" />
          <div className="absolute inset-0 rounded-full bg-cyan-400/10" />
        </div>
        {!collapsed && (
          <span className="font-display font-bold text-sm tracking-wide text-cyan-gradient whitespace-nowrap">
            AquaScan AI
          </span>
        )}
        <button
          onClick={onToggle}
          className="ml-auto text-slate-400 hover:text-cyan-400 transition-colors flex-shrink-0"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 flex flex-col gap-1">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-xl text-sm transition-all duration-200 group ${
              active === id
                ? "nav-active text-cyan-400"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/4"
            }`}
            style={active === id ? { borderLeft: "3px solid #22D3EE" } : {}}
          >
            <Icon
              size={18}
              className={`flex-shrink-0 transition-colors ${
                active === id ? "text-cyan-400" : "text-slate-500 group-hover:text-cyan-400"
              }`}
            />
            {!collapsed && <span className="whitespace-nowrap">{label}</span>}
          </button>
        ))}
      </nav>

      {/* Settings */}
      <div className="border-t border-cyan-400/10 py-3">
        <button className="flex items-center gap-3 px-4 py-2 mx-2 rounded-xl text-sm text-slate-400 hover:text-slate-200 hover:bg-white/4 transition-all w-[calc(100%-16px)]">
          <Settings size={18} className="flex-shrink-0 text-slate-500" />
          {!collapsed && <span>Settings</span>}
        </button>

        {/* User profile */}
        {!collapsed && (
          <div className="mx-2 mt-2 p-3 rounded-xl bg-white/3 border border-cyan-400/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                DR
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-slate-200 truncate">Dr. Rivera</div>
                <div className="text-xs text-slate-500 truncate">Marine Research</div>
              </div>
              <LogOut size={14} className="text-slate-500 hover:text-coral flex-shrink-0 cursor-pointer" />
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center mt-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
              DR
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
